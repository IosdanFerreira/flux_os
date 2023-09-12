import { prismaClient } from '../../../shared/services/PrismaClient';
import { ICreateClientRequestDTO } from './CreateClientDTO';

const checkClientExistence = async (client: ICreateClientRequestDTO) => {

    const clientExist = await prismaClient.client.findUnique({
        where:{
            email: client.email
        }
    });

    return clientExist;
};

export const createClientUseCase = async (client: ICreateClientRequestDTO): Promise<number | Error> => {
    try {

        const clientExist = await checkClientExistence(client);

        if(clientExist) {
            return new Error('Já existe um cliente cadastrado com esse endereço de email');
        }

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