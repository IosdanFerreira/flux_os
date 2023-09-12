import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import { ICreateClientRequestDTO } from './CreateClientDTO';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { createClientUseCase } from './CreateClientUseCase';


interface IBody extends ICreateClientRequestDTO {}

export const createClientValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({
        name: yup.string().required().min(3),
        surname: yup.string().required().min(3),
        email: yup.string().email().required(),
        phone: yup.string().required(),
        cpf: yup.string().required().min(14),
        rg: yup.string().required().min(13),
        gender: yup.string().required(),
        cep: yup.string().required().min(10),
        street: yup.string().required(),
        number_house: yup.string().required(),
        neighborhood: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required(),
        user_id: yup.number().required()
    }))
}));

export const createClient = async (request: Request<{}, {}, IBody>, response: Response) => {

    const createdClient = await createClientUseCase(request.body);
    
    if(createdClient instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                message: createdClient.message
            }
        });
    }

    return response.status(StatusCodes.CREATED).json(createdClient);
};