import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { getAllPaymentOptionsUseCase } from './GetAllPaymentOptionsUseCase';
import { getAllPaymentOptionsCount } from './GetAllPaymentOptionsCount';


interface IQuery  {
    page?: number,
    limit?: number,
    filter?: string,
}

export const getAllPaymentOptionsValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        page: yup.number().moreThan(0),
        limit: yup.number().moreThan(0),
        filter: yup.string().min(3),
    })),
}));

export const getAllPaymentOptions = async (request: Request<{}, {}, {}, IQuery>, response: Response) => {

    const query = request.query;

    const allPaymentOptions = await getAllPaymentOptionsUseCase(Number(query.page) || 1, query.filter || '', Number(query.limit) || 10);

    const count = await getAllPaymentOptionsCount(query.filter);
 
    if(allPaymentOptions instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                message: allPaymentOptions.message
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

    return response.status(StatusCodes.OK).json(allPaymentOptions);
};