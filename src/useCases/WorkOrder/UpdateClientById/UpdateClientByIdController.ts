import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { IUpdateClientByIdRequestDTO } from './UpdateClientByIdDTO';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { updateClientByIdUseCase } from './UpdateClientByIdUseCase';

interface IBody extends IUpdateClientByIdRequestDTO {}

interface IParams {
    id?: number
}

interface IQuery {
    client_id?: number
}

export const updateClientByIdValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({
        name: yup.string().required().min(3),
        surname: yup.string().nullable().min(3),
        email: yup.string().required().email(),
        phone: yup.string().nullable(),
        cpf: yup.string().required(),
        rg: yup.string().nullable(),
        gender: yup.string().required(),
        cep: yup.string().required(),
        street: yup.string().required(),
        number_house: yup.string().nullable(),
        neighborhood: yup.string().nullable(),
        state: yup.string().nullable(),
        city: yup.string().nullable(),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().required().default(0).integer()
    })),
    query: getSchema<IQuery>(yup.object().shape({
        client_id: yup.number().required().default(0).integer()
    })),
}));

export const updateClientById = async (request: Request<IParams, {}, IBody, IQuery>, response: Response) => {

    const params = request.params;
    const body = request.body;
    const query = request.query;

    if(!params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O id do usuário deve ser informado como parâmetro'
            }
        });
    } else if(!query.client_id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O id cliente deve ser informado na query'
            }
        });
    }

    const updatedClient = await updateClientByIdUseCase(Number(params.id), Number(query.client_id), body);

    if(updatedClient instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: updatedClient.message
            }
        });
    }

    return response.status(StatusCodes.OK).json(updatedClient);
};