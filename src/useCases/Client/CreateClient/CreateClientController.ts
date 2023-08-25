import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import { ICreateClientRequestDTO } from './CreateClientDTO';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { insertUserInDB } from './CreateClientUseCase';


interface IBody extends ICreateClientRequestDTO {}

export const createClientValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({
        name: yup.string().required().min(3),
        surname: yup.string().nullable().min(3),
        email: yup.string().email().required(),
        phone: yup.string().nullable(),
        cpf: yup.string().required().min(14),
        rg: yup.string().nullable().min(13),
        gender: yup.string().required(),
        cep: yup.string().required().min(10),
        street: yup.string().required(),
        number_house: yup.string().nullable(),
        neighborhood: yup.string().nullable(),
        state: yup.string().nullable(),
        city: yup.string().nullable(),
        user_id: yup.number().required()
    }))
}));

export const createClient = async (request: Request<{}, {}, IBody>, response: Response) => {

    const createdClient = await insertUserInDB(request.body);
    
    if(createdClient instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                message: createdClient.message
            }
        });
    }

    return response.status(StatusCodes.CREATED).json(createdClient);
};