import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { getAllPaymentSituationsUseCase } from './GetAllPaymentSituationsUseCase';
import { getAllPaymentSituationsCount } from './GetAllPaymentSituationsCount';


interface IQuery  {
    page?: number,
    limit?: number,
    filter?: string,
}

export const getAllPaymentSituationsValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        page: yup.number().moreThan(0),
        limit: yup.number().moreThan(0),
        filter: yup.string().min(3),
    })),
}));

export const getAllPaymentSituations = async (request: Request<{}, {}, {}, IQuery>, response: Response) => {

    const query = request.query;

    const allPaymentSituations = await getAllPaymentSituationsUseCase(Number(query.page) || 1, query.filter || '', Number(query.limit) || 10);

    const count = await getAllPaymentSituationsCount(query.filter);
 
    if(allPaymentSituations instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                message: allPaymentSituations.message
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

    return response.status(StatusCodes.OK).json(allPaymentSituations);
};