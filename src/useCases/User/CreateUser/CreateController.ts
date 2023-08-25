import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import * as yup from 'yup';
import { createUser } from './CreateUserUseCase';
import { StatusCodes } from 'http-status-codes';


interface IBody extends ICreateUserRequestDTO {}

export const signUpValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({
        name: yup.string().required().min(3),
        surname: yup.string().nullable().min(3),
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
    }))
}));

export const signUp = async (request: Request<{}, {}, IBody>, response: Response) => {

    const userCreated = await createUser(request.body);

    if (userCreated instanceof Error) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            error:{
                message: userCreated.message
            }
        });
    }

    return response.status(StatusCodes.CREATED).json(userCreated);
};