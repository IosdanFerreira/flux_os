import { prismaClient } from '../../../shared/services/PrismaClient';


export const deleteEmployeeByIdUseCase = async (user_id:number, employee_id: number): Promise<void | Error> => {

    try {

        const deletedClient = await prismaClient.employee.delete({
            where:{
                user_id: user_id,
                id: employee_id
            }
        });

        if(deletedClient) return;
        
        return new Error('Erro ao deletar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao deletar o registro');
        
    } finally {
        await prismaClient.$disconnect();
    }

};