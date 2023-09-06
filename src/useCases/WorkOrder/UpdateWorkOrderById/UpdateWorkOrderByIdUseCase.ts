import { prismaClient } from '../../../shared/services/PrismaClient';
import { IUpdateWorkOrderByIdRequestDTO } from './UpdateWorkOrderByIdDTO';


const checkWorkOrderExistence = async (user_id: number, work_order_id: number) => {
    const count = await prismaClient.workOrder.count({
        where: {
            user_id: user_id,
            id: work_order_id,
        },
    });

    return count > 0;
};

const checkServicesExistence = async (services_ids: number[]) => {
    const servicesExist = await prismaClient.service.findMany({
        where: {
            id: {
                in: services_ids
            },
        },
    });

    return servicesExist;
};

const updateWorkOrder = async (user_id: number, work_order_id:number, work_order_body: Omit<IUpdateWorkOrderByIdRequestDTO, 'services_id'>) => {
    const updatedWorkOrder = await prismaClient.workOrder.update({
        where: {
            user_id: user_id,
            id: work_order_id,
        },
        data: work_order_body,
    });

    return updatedWorkOrder;
};

const listNewServiceInWorkOrderIfNotExist = async (work_order_id:number, user_id: number, services_from_body_ids: number[]) => {

    const existingServicesInWorkOrder = await prismaClient.servicesOnWorkOrders.findMany({
        where: {
            workOrder_id: work_order_id,
        },
    });
    const existingServiceIds = existingServicesInWorkOrder.map((service) => service.service_id);

    const listNewServiceInWorkOrder = services_from_body_ids.map(async (service_id) => {

        if (!existingServiceIds.includes(service_id)) {
            await prismaClient.servicesOnWorkOrders.create({
                data: {
                    service: {
                        connect: {
                            id: service_id,
                        },
                    },
                    workOrder: {
                        connect: {
                            id: work_order_id,
                        },
                    },
                    user: {
                        connect: {
                            id: user_id,
                        },
                    }
                },
            });
        }
    });

    return listNewServiceInWorkOrder;
};

const removeServicesFromWorkOrder = async (work_order_id:number, work_orders_services_ids: number[]) => {

    const existingServicesInWorkOrder = await prismaClient.servicesOnWorkOrders.findMany({
        where: {
            workOrder_id: work_order_id,
        },
    });
    
    const existingServiceIds = existingServicesInWorkOrder.map((service) => service.service_id);
    
    const removedServiceIds = existingServiceIds.filter((serviceId) => !work_orders_services_ids.includes(serviceId));
    
    const removeServicePromises = removedServiceIds.map(async (serviceId) => {
        await prismaClient.servicesOnWorkOrders.deleteMany({
            where: {
                service_id: serviceId,
                workOrder_id: work_order_id,
            },
        });
    });
    
    return removeServicePromises;
};

export const updateWorkOrderByIdUseCase = async (user_id: number, work_order_id: number, work_order: IUpdateWorkOrderByIdRequestDTO): Promise<number | Error> => {
    try {
        
        const servicesExist = await checkServicesExistence(work_order.services_id);

        if (servicesExist.length !== work_order.services_id.length) {
            return new Error('Alguns serviços não existem na tabela de services');
        }

        const workOrderExist = await checkWorkOrderExistence(user_id, work_order_id);

        if (!workOrderExist) {
            return new Error('Nenhuma Ordem de Serviço foi encontrada');
        }

        const updatedWorkOrder = await updateWorkOrder(
            user_id,
            work_order_id,
            {
                client_id: work_order.client_id,
                vehicle_id: work_order.vehicle_id,
                employee_id: work_order.employee_id,
                init_date: work_order.init_date,
                init_time: work_order.init_time,
                end_date: work_order.end_date,
                end_time: work_order.end_time,
                payment_form_id: work_order.payment_form_id,
                payment_situation_id: work_order.payment_situation_id,
                comments: work_order.comments,
                user_id: work_order.user_id,
            });

        if (!updatedWorkOrder) {
            return new Error('Erro ao atualizar a ordem de serviço');
        }

        const listNewServiceInWorkOrderPromise = await listNewServiceInWorkOrderIfNotExist(work_order_id, user_id, work_order.services_id);

        const removeServicesFromWorkOrderPromise = await removeServicesFromWorkOrder(work_order_id, work_order.services_id);

        await Promise.all([...listNewServiceInWorkOrderPromise, ...removeServicesFromWorkOrderPromise]);

        return updatedWorkOrder.id;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao atualizar registro');
    } finally {
        await prismaClient.$disconnect();
    }
};