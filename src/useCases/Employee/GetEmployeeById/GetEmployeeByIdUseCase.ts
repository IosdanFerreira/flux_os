import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetEmployeeByIdRequestDTO } from './GetEmployeeByIdDTO';


export const getEmployeeByIdUseCase = async (user_id: number, employee_id: number): Promise<IGetEmployeeByIdRequestDTO | Error> => {
    try {

        const employeeById = await prismaClient.employee.findUnique({
            where: {
                user_id: user_id,
                id: employee_id,
            }
        });

        if(!employeeById?.id) {
            return new Error('Nenhum registro encontrado!');
        } else {

            return employeeById;
        }

    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar funcionário por id');
    } finally {
        prismaClient.$disconnect();
    }
};