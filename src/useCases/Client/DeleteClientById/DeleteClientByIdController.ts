import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { DeleteClientByIdUseCase } from './DeleteClientByIdUseCase';
import { StatusCodes } from 'http-status-codes';


interface IParams {
    id?: number
}

interface IQuery {
    client_id?: number
}

export const deleteClientByIdValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        client_id: yup.number().integer().default(0).required(),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().default(0).required(),
    }))
}));

export const deleteClientById = async (request: Request<IParams,{},{}, IQuery>, response: Response) => {

    const params = request.params;
    const query = request.query;

    const deletedclient = await DeleteClientByIdUseCase(Number(params.id), Number(query.client_id));

    if(deletedclient instanceof Error) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: deletedclient.message
            }
        });
    }

    return response.status(StatusCodes.OK).json(deletedclient);

}; 