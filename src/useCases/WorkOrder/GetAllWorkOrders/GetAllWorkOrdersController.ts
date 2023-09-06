import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { getAllClientsCount } from './GetAllWorkOrdersCount';
import { StatusCodes } from 'http-status-codes';
import { getAllWorkOrdersUseCase } from './GetAllWorkOrdersUseCase';


interface IQuery  {
    page?: number,
    limit?: number,
    init?: string,
    end?: string,
}
interface IParams {
    id?: number,
}

export const getAllWorkOrdersValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        page: yup.number().moreThan(0),
        limit: yup.number().moreThan(0),
        init: yup.string().min(3),
        end: yup.string().min(3),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().default(0).required(),
    }))
}));

export const getAllWorkOrders = async (request: Request<IParams, {}, {}, IQuery>, response: Response) => {

    const query = request.query;
    const params = request.params;

    if(!query.init) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors:{
                message: 'A data inicial deve ser informada'
            }
        }); 
    } else if(!query.end) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors:{
                message: 'A data final deve ser informada'
            }
        }); 
    }

    const allWorkOrders = await getAllWorkOrdersUseCase(Number(query.page) || 1, query.init || '', query.end || '' ,Number(query.limit) || 10, Number(params.id));

    const count = await getAllClientsCount(query.init, query.end);

    if(allWorkOrders instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                message: allWorkOrders.message
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

    return response.status(StatusCodes.OK).json(allWorkOrders);
};