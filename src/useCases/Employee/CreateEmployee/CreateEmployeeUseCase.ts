import { prismaClient } from '../../../shared/services/PrismaClient';
import { ICreateEmployeeRequestDTO } from './CreateEmployeeDTO';

const checkEmployeeExistence = async (employee: ICreateEmployeeRequestDTO) => {

    const clientExist = await prismaClient.employee.findUnique({
        where:{
            email: employee.email
        }
    });

    return clientExist;
};

export const createEmployeeUseCase = async (employee: ICreateEmployeeRequestDTO): Promise<number | Error> => {
    try {

        const employeeExist = await checkEmployeeExistence(employee);

        if(employeeExist) {
            return new Error('Já existe um funcionário cadastrado com esse endereço de email');
        }

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