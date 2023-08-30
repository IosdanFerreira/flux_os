import { prismaClient } from '../../../shared/services/PrismaClient';
import { IUpdateServiceByIdRequestDTO } from './UpdateServiceByIdDTO';


export const updateServiceByIdUseCase = async (user_id: number, service_id: number, service: IUpdateServiceByIdRequestDTO): Promise<void | Error> => {
    try {

        const count = await prismaClient.service.count({
            where:{
                user_id: user_id,
                id: service_id
            }
        });

        if(count === 0) {
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
        return new Error(`Erro ao atualizar registro - ${error}`);
    } finally {
        await prismaClient.$disconnect();
    }
};