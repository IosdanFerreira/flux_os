import { prismaClient } from '../../../shared/services/PrismaClient';


export const getAllClientsCount = async (filter:string = ''): Promise<number | Error> => {
    try {

        const allClientsCount = await prismaClient.client.count({
            where:{
                OR:[
                    {name:  {contains: filter}},
                    {surname: {contains: filter}},
                ]
            }
        });

        if(Number.isInteger(allClientsCount)) return allClientsCount;
        
        return new Error('Erro ao consultar a quantidade total de registros');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar a quantidade total de registros');
    } finally {
        await prismaClient.$disconnect();
    }
};