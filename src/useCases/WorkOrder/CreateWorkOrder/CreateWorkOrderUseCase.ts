import { prismaClient } from '../../../shared/services/PrismaClient';
import { ICreateWorkOrderRequestDTO } from './CreateWorkOrderDTO';

export const createWorkOrderUseCase = async (work_order: ICreateWorkOrderRequestDTO): Promise<number | Error> => {
    try {

        const servicesExist = await prismaClient.service.findMany({
            where: {
                id: {
                    in: work_order.services_id,
                },
            },
        });

        if (servicesExist.length !== work_order.services_id.length) {
            return new Error('Alguns serviços não existem na tabela de services');
        }

        const createdWorkOrder = await prismaClient.workOrder.create({
            data: {
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
            },
        });

        if (!createdWorkOrder) {
            return new Error('Erro ao cadastrar a ordem de serviço');
        }

        const servicePromises = work_order.services_id.map(async (service_id) => {
            await prismaClient.servicesOnWorkOrders.create({
                data: {
                    service: {
                        connect: {
                            id: service_id,
                        },
                    },
                    workOrder: {
                        connect: {
                            id: createdWorkOrder.id,
                        },
                    },
                    user:{
                        connect: {
                            id: work_order.user_id
                        }
                    }
                },
            });
        });

        await Promise.all(servicePromises);

        return createdWorkOrder.id;
    } catch (error: any) {
        console.log(error);
        return new Error('Erro ao cadastrar a ordem de serviço');
    } finally {
        await prismaClient.$disconnect();
    }
};
