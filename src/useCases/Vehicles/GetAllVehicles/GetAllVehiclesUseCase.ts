import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetAllVehiclesRequestDTO } from './GetAllVehiclesDTO';

export const getAllVehiclesUseCase = async (page: number, filter: string, limit: number, user_id:number = 0): Promise<IGetAllVehiclesRequestDTO[] | Error> => {

    try {

        const allVehicles = await prismaClient.vehicle.findMany({
            where:{
                id: user_id
            }
        });

        if(allVehicles) {

            const allVehiclesWhitClients = allVehicles.map(vehicle => ({
                ...vehicle
            }));

            return allVehiclesWhitClients;
        }
        
        return new Error('Erro ao consultar todos os veículos');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar todos os veículos');
    } finally {
        await prismaClient.$disconnect();
    }
};