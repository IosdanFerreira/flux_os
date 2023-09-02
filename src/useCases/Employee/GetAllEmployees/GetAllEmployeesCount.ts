import { prismaClient } from '../../../shared/services/PrismaClient';


export const getAllEmployeesCount = async (filter:string = ''): Promise<number | Error> => {
    try {

        const allEmployeeCount = await prismaClient.employee.count({
            where:{
                OR:[
                    {name: {contains: filter}},
                    {surname: {contains: filter}},
                    {cpf: {contains: filter}},
                ]
            }
        });

        if(Number.isInteger(allEmployeeCount)) return allEmployeeCount;
        
        return new Error('Erro ao consultar a quantidade total de registros');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar a quantidade total de registros');
    } finally {
        await prismaClient.$disconnect();
    }
};