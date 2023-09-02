import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { getAllEmployeesCount } from './GetAllEmployeesCount';
import { getAllEmployeesUseCase } from './GetAllEmployeesUseCase';


interface IQuery  {
    page?: number,
    limit?: number,
    filter?: string,
}
interface IParams {
    id?: number,
}

export const getAllEmployeesValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        page: yup.number().moreThan(0),
        limit: yup.number().moreThan(0),
        filter: yup.string().min(3),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().default(0).required(),
    }))
}));

export const getAllEmployees = async (request: Request<IParams, {}, {}, IQuery>, response: Response) => {

    const query = request.query;
    const params = request.params;

    const allEmployees = await getAllEmployeesUseCase(Number(query.page) || 1, query.filter || '', Number(query.limit) || 10, Number(params.id));

    const count = await getAllEmployeesCount(query.filter);

    if(allEmployees instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                message: allEmployees.message
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

    return response.status(StatusCodes.OK).json(allEmployees);
};