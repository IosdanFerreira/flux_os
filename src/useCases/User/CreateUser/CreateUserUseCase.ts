import { ICreateUserRequestDTO } from './CreateUserDTO';
import { prismaClient } from '../../../shared/services/PrismaClient';
import { passwordCrypto } from '../../../shared/services/PasswordCrypto';


export const createUser = async (user:  ICreateUserRequestDTO): Promise<number | Error> => {
    try {

        const hashedPassword = await passwordCrypto.hashPassword(user.password);

        const result = await prismaClient.user.create({
            data: {
                ...user,
                password: hashedPassword
            }
        });
        
        if(result) return result.id;
        
        return new Error('Erro ao cadastrar usuário');
    } catch (error: any) {
        console.log(error);

        if(error.meta.target == 'email') {
            return new Error('Já existe uma conta cadastrada com esse endereço de email');
        }

        return new Error('Erro ao cadastrar usuário');
    } finally {
        await prismaClient.$disconnect();
    }
};