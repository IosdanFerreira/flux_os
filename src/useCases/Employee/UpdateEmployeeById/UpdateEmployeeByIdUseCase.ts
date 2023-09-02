import { prismaClient } from '../../../shared/services/PrismaClient';
import { IUpdateEmployeeByIdRequestDTO } from './UpdateEmployeeByIdDTO';


export const updateEmployeeByIdUseCase = async (user_id: number, employee_id: number, employee: IUpdateEmployeeByIdRequestDTO): Promise<void | Error> => {
    try {

        const count = await prismaClient.employee.count({
            where:{
                user_id: user_id,
                id: employee_id
            }
        });

        if(count === 0) {
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
        return new Error(`Erro ao atualizar registro - ${error}`);
    } finally {
        await prismaClient.$disconnect();
    }
};