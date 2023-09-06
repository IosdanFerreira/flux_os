import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { getClientByIdUseCase } from './GetWorkOrderByIdUseCase';
import { StatusCodes } from 'http-status-codes';

interface IParams {
    id?: number
}

interface IQuery {
    work_order_id?: number
}

export const getWorkOrderByIdValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        work_order_id: yup.number().integer().default(0).required(),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().default(0).required(),
    }))
}));

export const getWorkOrderById = async (request: Request<IParams, {}, {}, IQuery>, response: Response) => {

    const query = request.query;
    const params = request.params;

    const workOrderById = await getClientByIdUseCase(Number(params.id), Number(query.work_order_id));

    if(workOrderById instanceof Error) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: workOrderById.message
            }
        });
    }

    return response.status(StatusCodes.OK).json(workOrderById);

};