import { prismaClient } from '../../../shared/services/PrismaClient';
import { ICreateServiceRequestDTO } from './CreateServiceDTO';

export const createServiceUseCase = async (service: ICreateServiceRequestDTO): Promise<number | Error> => {
    try {

        const createdService = await prismaClient.service.create({
            data: {
                ...service
            }
        });

        if(createdService) return createdService.id;
    
        return new Error('Erro ao cadastrar o serviço');
    } catch (error: any) {
        console.log(error);

        return new Error('Erro ao cadastrar o serviço');
    } finally {
        await prismaClient.$disconnect();
    }
};