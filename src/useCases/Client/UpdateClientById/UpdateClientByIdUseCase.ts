import { prismaClient } from '../../../shared/services/PrismaClient';
import { IUpdateClientByIdRequestDTO } from './UpdateClientByIdDTO';


export const updateClientByIdUseCase = async (user_id: number, client_id: number, client: IUpdateClientByIdRequestDTO): Promise<void | Error> => {
    try {

        const count = await prismaClient.client.count({
            where:{
                user_id: user_id,
                id: client_id
            }
        });

        if(count === 0) {
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
        return new Error(`Erro ao atualizar registro - ${error}`);
    }
};