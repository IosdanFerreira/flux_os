import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { deleteServiceByIdUseCase } from './DeleteServiceByIdUseCase';
import { StatusCodes } from 'http-status-codes';


interface IParams {
    id?: number
}

interface IQuery {
    service_id?: number
}

export const deleteServiceByIdValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        service_id: yup.number().integer().default(0).required(),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().default(0).required(),
    }))
}));

export const deleteServiceById = async (request: Request<IParams,{},{}, IQuery>, response: Response) => {

    const params = request.params;
    const query = request.query;

    const deletedService = await deleteServiceByIdUseCase(Number(params.id), Number(query.service_id));

    if(deletedService instanceof Error) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: deletedService.message
            }
        });
    }

    return response.status(StatusCodes.OK).json(deletedService);

}; 