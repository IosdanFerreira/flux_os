import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetAllEmployeesRequestDTO } from './GetAllEmployeesDTO';


export const getAllEmployeesUseCase = async (page: number, filter: string, limit: number, user_id:number = 0): Promise<IGetAllEmployeesRequestDTO[] | Error> => {

    try {

        const allEmployees = await prismaClient.user.findUnique({
            where:{
                id: user_id
            },
            include:{
                Employee:{
                    where: {
                        OR: [
                            {name: {contains: filter}},
                            {surname: {contains: filter}},
                            {cpf: {contains: filter}},
                        ]
                    },
                    skip: (page - 1) * limit,
                    take: limit
                }
            }
        });

        if(allEmployees) {

            const allVehiclesWhitClients = allEmployees.Employee.map(employee => ({
                ...employee,
                user_id: undefined,
            }));

            return allVehiclesWhitClients;
        }
        
        return new Error('Erro ao consultar todos os funcionários');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar todos os funcionários');
    } finally {
        await prismaClient.$disconnect();
    }
};