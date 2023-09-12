import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetServiceByIdRequestDTO } from './GetServiceByIdDTO';


export const getServiceByIdUseCase = async (user_id: number, client_id: number): Promise<IGetServiceByIdRequestDTO | Error> => {
    try {

        const serviceById = await prismaClient.service.findUnique({
            where: {
                user_id: user_id,
                id: client_id
            }
        });

        if(!serviceById?.id) {
            return new Error('Nenhum registro encontrado!');
        } else {

            return serviceById;
        }
        
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar serviço por id');
    } finally {
        prismaClient.$disconnect();
    }
};