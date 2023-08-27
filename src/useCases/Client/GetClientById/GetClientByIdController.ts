import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { getClientByIdUseCase } from './GetClientByIdUseCase';
import { StatusCodes } from 'http-status-codes';

interface IParams {
    id?: number
}

interface IQuery {
    client_id?: number
}

export const getClientByIdValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        client_id: yup.number().integer().default(0).required(),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().default(0).required(),
    }))
}));

export const getClientById = async (request: Request<IParams, {}, {}, IQuery>, response: Response) => {

    const query = request.query;
    const params = request.params;

    const clientById = await getClientByIdUseCase(Number(params.id), Number(query.client_id));

    if(clientById instanceof Error) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: clientById.message
            }
        });
    }

    return response.status(StatusCodes.OK).json(clientById);

};