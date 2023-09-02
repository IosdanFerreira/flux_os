import { prismaClient } from '../../../shared/services/PrismaClient';
import { ICreateEmployeeRequestDTO } from './CreateEmployeeDTO';

export const createEmployeeUseCase = async (employee: ICreateEmployeeRequestDTO): Promise<number | Error> => {
    try {

        const createdEmployee = await prismaClient.employee.create({
            data: {
                ...employee
            }
        });

        if(createdEmployee) return createdEmployee.id;
    
        return new Error('Erro ao cadastrar o funcionário');
    } catch (error: any) {
        console.log(error);

        return new Error('Erro ao cadastrar o funcionário');
    } finally {
        await prismaClient.$disconnect();
    }
};