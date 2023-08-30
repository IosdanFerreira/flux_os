import { prismaClient } from '../../../shared/services/PrismaClient';


export const deleteServiceByIdUseCase = async (user_id:number, client_id: number): Promise<void | Error> => {

    try {

        const deletedClient = await prismaClient.service.delete({
            where:{
                user_id: user_id,
                id: client_id
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