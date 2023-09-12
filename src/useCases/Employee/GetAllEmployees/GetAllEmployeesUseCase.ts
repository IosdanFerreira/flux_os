import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetAllEmployeesRequestDTO } from './GetAllEmployeesDTO';


export const getAllEmployeesUseCase = async (page: number, filter: string, limit: number, user_id:number = 0): Promise<IGetAllEmployeesRequestDTO[] | Error> => {

    try {

        const allEmployees = await prismaClient.employee.findMany({
            where:{
                user_id: user_id
            }
        });

        if(allEmployees) return allEmployees;
        
        return new Error('Erro ao consultar todos os funcionários');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar todos os funcionários');
    } finally {
        await prismaClient.$disconnect();
    }
};