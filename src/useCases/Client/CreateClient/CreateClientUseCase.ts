import { prismaClient } from '../../../shared/services/PrismaClient';
import { ICreateClientRequestDTO } from './CreateClientDTO';

export const insertUserInDB = async (client: ICreateClientRequestDTO): Promise<number | Error> => {
    try {

        const createdClient = await prismaClient.client.create({
            data: {
                ...client
            }
        });

        if(createdClient) return createdClient.id;
    
        return new Error('Erro ao cadastrar cliente');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar cliente');
    }
};