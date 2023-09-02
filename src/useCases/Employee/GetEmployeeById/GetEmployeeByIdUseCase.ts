import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetEmployeeByIdRequestDTO } from './GetEmployeeByIdDTO';


export const getEmployeeByIdUseCase = async (user_id: number, employee_id: number): Promise<IGetEmployeeByIdRequestDTO | Error> => {
    try {

        const employeeById = await prismaClient.employee.findFirst({
            where: {
                user_id: user_id,
                id: employee_id,
            }
        });

        if(!employeeById?.id) {
            return new Error('Nenhum registro encontrado!');
        } else if(employeeById) {

            const {...employeeData} = employeeById;

            const employeeWithoutUserId = {
                ...employeeData,
                user_id: undefined,
            };

            return employeeWithoutUserId;
        }
        
        return new Error('Erro ao consultar funcionário por id');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar funcionário por id');
    } finally {
        prismaClient.$disconnect();
    }
};