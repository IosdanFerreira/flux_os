import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetAllWorkOrdersRequestDTO } from './GetAllWorkOrdersDTO';

const handleFormattedAllWorkOrdersResult = (work_orders: IGetAllWorkOrdersRequestDTO[]) => {

    const allWorkOrdersFormatted = work_orders.map(work_order => ({
        ...work_order,
        client_id: undefined,
        user_id: undefined,
        employee_id: undefined,
        vehicle_id: undefined,
        payment_form_id: undefined,
        payment_situation_id: undefined
    }));


    return allWorkOrdersFormatted;
};


export const getAllWorkOrdersUseCase = async (page: number, init: string, end: string, limit: number, user_id:number = 0): Promise<IGetAllWorkOrdersRequestDTO[] | Error> => {
    try {

        const allWorkOrders = await prismaClient.workOrder.findMany({
            where: {
                user_id: user_id,
                AND: [
                    {
                        init_date: {
                            gte: init,
                        },
                    },
                    {
                        end_date: {
                            lte: end,
                        },
                    },
                ],
            },
            orderBy:{
                id: 'desc'
            },
            skip: (page - 1) * limit,
            take: limit,
            include: {
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
            },
                
            
        });

        if(allWorkOrders) {
            const allWorkOrdersFormatted = handleFormattedAllWorkOrdersResult(allWorkOrders); 

            return allWorkOrdersFormatted;
        } 
    
        return new Error('Erro ao consultar todos os clientes');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar todos os clientes');
    } finally {
        await prismaClient.$disconnect();
    }
};