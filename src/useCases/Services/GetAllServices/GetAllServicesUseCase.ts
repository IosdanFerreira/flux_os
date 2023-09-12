import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetAllServicesRequestDTO } from './GetAllServicesDTO';


export const getAllServicesUseCase = async (page: number, filter: string, limit: number, user_id:number = 0): Promise<IGetAllServicesRequestDTO[] | Error> => {

    try {

        const allServices = await prismaClient.service.findMany({
            where:{
                user_id: user_id
            },
        });

        if(allServices) return allServices;
        
        return new Error('Erro ao consultar todos os serviços');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar todos os serviços');
    } finally {
        await prismaClient.$disconnect();
    }
};