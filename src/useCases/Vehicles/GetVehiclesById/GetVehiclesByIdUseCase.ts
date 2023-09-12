import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetVehicleByIdRequestDTO } from './GetVehiclesByIdDTO';


export const getVehicleByIdUseCase = async (user_id: number, vehicle_id: number): Promise<IGetVehicleByIdRequestDTO | Error> => {
    try {

        const vehicleById = await prismaClient.vehicle.findUnique({
            where: {
                user_id: user_id,
                id: vehicle_id,
            },
            include:{
                client: true
            }
        });

        if(!vehicleById?.id) {
            return new Error('Nenhum registro encontrado!');
        } else if(vehicleById) {

            return vehicleById;
        }
        
        return new Error('Erro ao consultar veículo por id');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar veículo por id');
    } finally {
        prismaClient.$disconnect();
    }
};