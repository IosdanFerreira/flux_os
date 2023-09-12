import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetWorkOrderByIdRequestDTO } from './GetWorkOrderByIdDTO';


const handleFormattedWorkOrderResult = (work_order: IGetWorkOrderByIdRequestDTO) => {

    const formattedWorkOrder = {
        ...work_order,
        client_id: undefined,
        user_id: undefined,
        employee_id: undefined,
        vehicle_id: undefined,
        payment_form_id: undefined,
        payment_situation_id: undefined
    };

    return formattedWorkOrder;

};

export const getClientByIdUseCase = async (user_id: number, work_order_id: number): Promise<IGetWorkOrderByIdRequestDTO | Error> => {
    try {

        const workOrderById = await prismaClient.workOrder.findFirst({
            where: {
                user_id: user_id,
                id: work_order_id,
            },
            include:{
                client: true,
                employee: true,
                vehicle: true,
                payment_form: true,
                payment_situation: true,
                ServicesOnWorkOrders: {
                    include: {
                        service: {
                            select: {
                                id:true,
                                name: true,
                                price: true,
                                estimated_time: true,
                                description: true,
                            }
                        },
                    },
                },
            }
        });

        if(!workOrderById?.id) {
            return new Error('Nenhum registro encontrado!');
        } else if(workOrderById) {

            const formattedWorkOrder =handleFormattedWorkOrderResult(workOrderById);

            return formattedWorkOrder;
        }
        
        return new Error('Erro ao consultar Ordem de Serviço por id');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar Ordem de Serviço por id');
    }
};