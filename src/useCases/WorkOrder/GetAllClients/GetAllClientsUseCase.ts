import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetAllClientsRequestDTO } from './GetAllClientsDTO';


export const GetAllClientsUseCase = async (page: number, filter: string, limit: number, user_id:number = 0): Promise<IGetAllClientsRequestDTO[] | Error> => {
    try {

        const allClients = await prismaClient.user.findUnique({
            where: {
                id: user_id
            },
            include: {
                Client: {
                    where: {
                        OR: [
                            {name: {contains: filter}},
                            {surname: {contains: filter}},
                            {cpf: {contains: filter}},
                        ]
                    },
                    skip: (page - 1) * limit,
                    take: limit
                }
            }
        });

        if(allClients) {

            const allClientWithoutUserId = allClients.Client.map(client => ({
                ...client,
                user_id: undefined
            }));


            return allClientWithoutUserId; 
        } 
    
        return new Error('Erro ao consultar todos os clientes');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar todos os clientes');
    } finally {
        await prismaClient.$disconnect();
    }
};