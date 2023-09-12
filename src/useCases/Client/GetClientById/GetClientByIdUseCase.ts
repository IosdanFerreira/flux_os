import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetClientByIdRequestDTO } from './GetClientByIdDTO';


export const getClientByIdUseCase = async (user_id: number, client_id: number): Promise<IGetClientByIdRequestDTO | Error> => {
    try {

        const clientById = await prismaClient.client.findUnique({
            where: {
                user_id: user_id,
                id: client_id
            }
        });

        if(!clientById?.id) {
            return new Error('Nenhum registro encontrado!');
        } else {

            return clientById;
        }
        
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar cliente por id');
    } finally {
        await prismaClient.$disconnect();
    }
};