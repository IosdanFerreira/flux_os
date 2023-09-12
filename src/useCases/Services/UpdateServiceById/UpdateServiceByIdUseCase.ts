import { prismaClient } from '../../../shared/services/PrismaClient';
import { IUpdateServiceByIdRequestDTO } from './UpdateServiceByIdDTO';

const checkServiceExistence = async (user_id: number, service_id: number) => {

    const serviceExist = await prismaClient.service.count({
        where:{
            user_id: user_id,
            id: service_id
        }
    });

    return serviceExist > 0;

};


export const updateServiceByIdUseCase = async (user_id: number, service_id: number, service: IUpdateServiceByIdRequestDTO): Promise<void | Error> => {
    try {

        const serviceExist = await checkServiceExistence(user_id, service_id);

        if(!serviceExist) {
            return new Error('Nenhum serviço foi encontrado');
        }

        const updatedService = await prismaClient.service.update({
            where:{
                user_id: user_id,
                id: service_id
            },
            data:{
                ...service
            }
        });

        if(updatedService) return;
    
        return new Error('Erro ao atualizar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar registro');
    } finally {
        await prismaClient.$disconnect();
    }
};