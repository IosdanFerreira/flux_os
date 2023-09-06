import { prismaClient } from '../../../shared/services/PrismaClient';


export const getAllClientsCount = async (init:string = '', end:string = ''): Promise<number | Error> => {
    try {

        const allClientsCount = await prismaClient.workOrder.count({
            where:{
                AND:[
                    {
                        init_date: {
                            gte: init
                        }
                    },
                    {
                        end_date: {
                            lte: end
                        }
                    }
                ]
            }
        });

        if(Number.isInteger(allClientsCount)) return allClientsCount;
        
        return new Error('Erro ao consultar a quantidade total de registros');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar a quantidade total de registros');
    } finally {
        await prismaClient.$disconnect();
    }
};