import { prismaClient } from '../../../shared/services/PrismaClient';
import { ICreateVehicleRequestDTO } from './CreateVehicleDTO';

export const createVehicleUseCase = async (vehicle: ICreateVehicleRequestDTO): Promise<number | Error> => {
    try {

        const createdVehicle = await prismaClient.vehicle.create({
            data: {
                ...vehicle
            }
        });

        if(createdVehicle) return createdVehicle.id;
    
        return new Error('Erro ao cadastrar o veículo');
    } catch (error: any) {
        console.log(error);

        return new Error('Erro ao cadastrar o veículo');
    } finally {
        await prismaClient.$disconnect();
    }
};