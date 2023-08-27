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
    } catch (error: any) {
        console.log(error);

        if (error.meta.target == 'email') {
            return new Error('Já existe um usuário cadastrado com esse endereço de email');
        }

        return new Error('Erro ao cadastrar cliente');
    } finally {
        await prismaClient.$disconnect();
    }
};