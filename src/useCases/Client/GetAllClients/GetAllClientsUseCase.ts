import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetAllClientsRequestDTO } from './GetAllClientsDTO';


export const GetAllClientsUseCase = async (page: number, filter: string, limit: number, user_id:number = 0): Promise<IGetAllClientsRequestDTO[] | Error> => {
    try {

        const allClients = await prismaClient.client.findMany({
            where: {
                user_id: user_id
            },
            skip: (page - 1) * limit,
            take: limit
        });

        if(allClients) return allClients;  
    
        return new Error('Erro ao consultar todos os clientes');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar todos os clientes');
    } finally {
        await prismaClient.$disconnect();
    }
};