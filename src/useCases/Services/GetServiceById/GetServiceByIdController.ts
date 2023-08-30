import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { getServiceByIdUseCase } from './GetServiceByIdUseCase';
import { StatusCodes } from 'http-status-codes';

interface IParams {
    id?: number
}

interface IQuery {
    service_id?: number
}

export const getServiceByIdValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        service_id: yup.number().integer().default(0).required(),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().default(0).required(),
    }))
}));

export const getServiceById = async (request: Request<IParams, {}, {}, IQuery>, response: Response) => {

    const query = request.query;
    const params = request.params;

    if(!query.service_id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'A consulta client_id está ausente'
            }
        });
    }

    const serviceById = await getServiceByIdUseCase(Number(params.id), Number(query.service_id));

    if(serviceById instanceof Error) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                message: serviceById.message
            }
        });
    }

    return response.status(StatusCodes.OK).json(serviceById);

};