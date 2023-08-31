import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetAllVehiclesRequestDTO } from './GetAllVehiclesDTO';


export const getAllVehiclesUseCase = async (page: number, filter: string, limit: number, user_id:number = 0): Promise<IGetAllVehiclesRequestDTO[] | Error> => {

    try {

        const allVehicles = await prismaClient.user.findUnique({
            where:{
                id: user_id
            },
            include:{
                Vehicle:{
                    where: {
                        OR: [
                            {make: {contains: filter}},
                            {model: {contains: filter}},
                            {plate: {contains: filter}},
                        ]
                    },
                    skip: (page - 1) * limit,
                    take: limit,
                    include:{
                        client: true,
                    }
                }
            }
        });

        if(allVehicles) {

            const allVehiclesWhitClients = allVehicles.Vehicle.map(vehicle => ({
                ...vehicle,
                client: undefined,
                client_id: undefined,
                user_id: undefined,
                client_data: {
                    id: vehicle?.client?.id,
                    name: vehicle?.client?.name,
                    surname: vehicle?.client?.surname,
                }
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