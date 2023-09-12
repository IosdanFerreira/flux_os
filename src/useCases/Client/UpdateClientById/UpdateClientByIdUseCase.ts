import { prismaClient } from '../../../shared/services/PrismaClient';
import { IUpdateClientByIdRequestDTO } from './UpdateClientByIdDTO';

const checkClientExistence = async (user_id: number, client_id:number) => {
    const clientExist = await prismaClient.client.count({
        where:{
            user_id: user_id,
            id: client_id
        }
    });

    return clientExist > 0;
};


export const updateClientByIdUseCase = async (user_id: number, client_id: number, client: IUpdateClientByIdRequestDTO): Promise<void | Error> => {
    try {

        const clientExist = await checkClientExistence(user_id, client_id);

        if(!clientExist) {
            return new Error('Nenhum cliente foi encontrado');
        }

        const updatedClient = await prismaClient.client.update({
            where:{
                user_id: user_id,
                id: client_id
            },
            data:{
                ...client
            }
        });

        if(updatedClient) return;
    
        return new Error('Erro ao atualizar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar registro');
    } finally {
        await prismaClient.$disconnect();
    }
};