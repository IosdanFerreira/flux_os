import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { getEmployeeByIdUseCase } from './GetEmployeeByIdUseCase';
import { StatusCodes } from 'http-status-codes';

interface IParams {
    id?: number
}

interface IQuery {
    employee_id?: number
}

export const getEmployeeByIdValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        employee_id: yup.number().integer().default(0).required(),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().default(0).required(),
    }))
}));

export const getEmployeeById = async (request: Request<IParams, {}, {}, IQuery>, response: Response) => {

    const query = request.query;
    const params = request.params;

    if(!query.employee_id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'A consulta employee_id está ausente'
            }
        });
    }

    const employeeById = await getEmployeeByIdUseCase(Number(params.id), Number(query.employee_id));

    if(employeeById instanceof Error) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                message: employeeById.message
            }
        });
    }

    return response.status(StatusCodes.OK).json(employeeById);

};