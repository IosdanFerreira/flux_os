import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetServiceByIdRequestDTO } from './GetServiceByIdDTO';


export const getServiceByIdUseCase = async (user_id: number, client_id: number): Promise<IGetServiceByIdRequestDTO | Error> => {
    try {

        const serviceById = await prismaClient.service.findFirst({
            where: {
                user_id: user_id,
                id: client_id
            }
        });

        if(!serviceById?.id) {
            return new Error('Nenhum registro encontrado!');
        } else if(serviceById) {
            return serviceById;
        }
        
        return new Error('Erro ao consultar serviço por id');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar serviço por id');
    }
};