import { prismaClient } from '../../../shared/services/PrismaClient';
import { IUpdateVehicleByIdRequestDTO } from './UpdateVehicleByIdDTO';


export const updateVehicleByIdUseCase = async (user_id: number, vehicle_id: number, vehicle: IUpdateVehicleByIdRequestDTO): Promise<void | Error> => {
    try {

        const count = await prismaClient.vehicle.count({
            where:{
                user_id: user_id,
                id: vehicle_id
            }
        });

        if(count === 0) {
            return new Error('Nenhum veículo foi encontrado');
        }

        const updatedService = await prismaClient.vehicle.update({
            where:{
                user_id: user_id,
                id: vehicle_id
            },
            data:{
                ...vehicle
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