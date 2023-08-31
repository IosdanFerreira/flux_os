import { prismaClient } from '../../../shared/services/PrismaClient';


export const deleteVehicleByIdUseCase = async (user_id:number, vehicle_id: number): Promise<void | Error> => {

    try {

        const deletedClient = await prismaClient.vehicle.delete({
            where:{
                user_id: user_id,
                id: vehicle_id
            }
        });

        if(deletedClient) return;
        
        return new Error('Erro ao deletar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao deletar o registro');
        
    } finally {
        await prismaClient.$disconnect();
    }

};