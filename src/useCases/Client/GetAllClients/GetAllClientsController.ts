import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { GetAllClientsUseCase } from './GetAllClientsUseCase';
import { getAllClientsCount } from './GetAllClientsCount';
import { StatusCodes } from 'http-status-codes';


interface IQuery  {
    page?: number,
    limit?: number,
    filter?: string,
}
interface IParams {
    id?: number,
}

export const getAllClientsValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        page: yup.number().moreThan(0),
        limit: yup.number().moreThan(0),
        filter: yup.string().min(3),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().default(0).required(),
    }))
}));

export const getAllClients = async (request: Request<IParams, {}, {}, IQuery>, response: Response) => {

    const query = request.query;
    const params = request.params;

    const allClients = await GetAllClientsUseCase(Number(query.page) || 1, query.filter || '', Number(query.limit) || 10, Number(params.id));

    const count = await getAllClientsCount(query.filter);

    if(allClients instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                message: allClients.message
            }
        });
    } else if (count instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                message: count.message
            }
        });
    }

    response.setHeader('access-control-expose-headers', 'x-total-count');
    response.setHeader('x-total-count', Number(count));

    return response.status(StatusCodes.OK).json(allClients);
};