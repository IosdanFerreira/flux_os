import { prismaClient } from '../../../shared/services/PrismaClient';
import { IUpdateEmployeeByIdRequestDTO } from './UpdateEmployeeByIdDTO';

const checkEmployeeExistence = async (user_id: number, employee_id:number) => {
    const employeeExist = await prismaClient.employee.count({
        where:{
            user_id: user_id,
            id: employee_id
        }
    });

    return employeeExist > 0;
};


export const updateEmployeeByIdUseCase = async (user_id: number, employee_id: number, employee: IUpdateEmployeeByIdRequestDTO): Promise<void | Error> => {
    try {

        const employeeExist = await checkEmployeeExistence(user_id, employee_id);

        if(!employeeExist) {
            return new Error('Nenhum funcionário foi encontrado');
        }

        const updatedEmployee = await prismaClient.employee.update({
            where:{
                user_id: user_id,
                id: employee_id
            },
            data:{
                ...employee
            }
        });

        if(updatedEmployee) return;
    
        return new Error('Erro ao atualizar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar registro');
    } finally {
        await prismaClient.$disconnect();
    }
};