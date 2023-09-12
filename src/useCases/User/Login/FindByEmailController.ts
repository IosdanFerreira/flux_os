import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import { IFindByEmailRequestDTO } from './FindByEmailDTO';
import * as yup from 'yup';
import { findByEmail } from './FindByEmailUseCase';
import { StatusCodes } from 'http-status-codes';
import { passwordCrypto } from '../../../shared/services/PasswordCrypto';
import {sign} from 'jsonwebtoken';
import { generateRefreshToken } from '../../../shared/services/GenerateRefreshToken';
import { generateTokenProvider } from '../../../shared/services/GenerateTokenProvider';
import { prismaClient } from '../../../shared/services/PrismaClient';


interface IBody extends IFindByEmailRequestDTO {}

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
    }))
}));

export const sigIn = async (request: Request<{}, {}, IBody>, response:Response) => {

    const {email,password} = request.body;

    const authUser = await findByEmail(email);

    if(authUser instanceof Error) {
        return response.status(StatusCodes.UNAUTHORIZED).send({
            errors:{
                message: 'Email ou senha são inválidos'
            }
        });
    }

    const passwordMatch = await passwordCrypto.verifyPassword(password, authUser.password);

    if(!passwordMatch) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                message: 'Email ou senha são inválidos'
            }
        });
    }

    const token = await generateTokenProvider(authUser.id);

    await prismaClient.refrehToken.deleteMany({
        where:{
            user_id: authUser.id
        }
    });

    const refreshToken = await generateRefreshToken(authUser.id);
    
    return response.status(StatusCodes.OK).json({...authUser, token, refreshToken});
};