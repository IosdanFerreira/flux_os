import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import { IFindByEmailRequestDTO } from './FindByEmailDTO';
import * as yup from 'yup';
import { findByEmail } from './FindByEmailUseCase';
import { StatusCodes } from 'http-status-codes';
import { passwordCrypto } from '../../../shared/services/PasswordCrypto';


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
    
    return response.status(StatusCodes.OK).json({...authUser, acessToken: 'teste.teste.teste'});
};