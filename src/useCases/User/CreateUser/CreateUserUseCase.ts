import { ICreateUserRequestDTO } from './CreateUserDTO';
import { prismaClient } from '../../../shared/services/PrismaClient';
import { passwordCrypto } from '../../../shared/services/PasswordCrypto';

export const checkUserExistence = async (user: ICreateUserRequestDTO) => {

    const userExist = await prismaClient.user.findFirst({
        where:{
            email: user.email
        }
    });

    return userExist;
};


export const createUser = async (user:  ICreateUserRequestDTO): Promise<number | Error> => {
    try {

        const userHasExist = await checkUserExistence(user);

        if(userHasExist) {
            return new Error('Já existe um usuário cadastrado com esse endereço de email');
        }

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
        return new Error('Erro ao cadastrar usuário');

    } finally {
        await prismaClient.$disconnect();
    }
};