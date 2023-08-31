import { prismaClient } from '../../../shared/services/PrismaClient';


export const getAllVehiclesCount = async (filter:string = ''): Promise<number | Error> => {
    try {

        const allVehiclesCount = await prismaClient.vehicle.count({
            where:{
                OR:[
                    {make:  {contains: filter}},
                    {model:  {contains: filter}},
                    {plate:  {contains: filter}},
                ]
            }
        });

        if(Number.isInteger(allVehiclesCount)) return allVehiclesCount;
        
        return new Error('Erro ao consultar a quantidade total de registros');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar a quantidade total de registros');
    } finally {
        await prismaClient.$disconnect();
    }
};