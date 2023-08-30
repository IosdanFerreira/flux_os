import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetAllServicesRequestDTO } from './GetAllServicesDTO';


export const getAllServicesUseCase = async (page: number, filter: string, limit: number, user_id:number = 0): Promise<IGetAllServicesRequestDTO[] | Error> => {

    try {

        const allServices = await prismaClient.user.findUnique({
            where:{
                id: user_id
            },
            include:{
                Service:{
                    where: {
                        OR: [
                            {name: {contains: filter}},
                        ]
                    },
                    skip: (page - 1) * limit,
                    take: limit 
                }
            }
        });

        if(allServices) return allServices.Service;
        
        return new Error('Erro ao consultar todos os serviços');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar todos os serviços');
    } finally {
        await prismaClient.$disconnect();
    }
};