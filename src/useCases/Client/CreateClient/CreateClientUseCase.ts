import { prismaClient } from '../../../shared/services/PrismaClient';
import { ICreateClientRequestDTO } from './CreateClientDTO';

export const createClientUseCase = async (client: ICreateClientRequestDTO): Promise<number | Error> => {
    try {

        const createdClient = await prismaClient.client.create({
            data: {
                ...client
            }
        });

        if(createdClient) return createdClient.id;
    
        return new Error('Erro ao cadastrar cliente');
    } catch (error: any) {
        console.log(error);
        console.log(error);

        return new Error('Erro ao cadastrar cliente');
    } finally {
        await prismaClient.$disconnect();
    }
};