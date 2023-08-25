import { User } from '../../../entities/User';
import { prismaClient } from '../../../shared/services/PrismaClient';


export const findByEmail = async (email: string): Promise<User | Error> => {
    try {

        const result = await prismaClient.user.findUnique({
            where:{
                email: email
            }
        });

        if(result) return result;
        
        return new Error('Nenhum usuário encontrado com esse endereço de email');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro');
    }
};