import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { deleteEmployeeByIdUseCase } from './DeleteEmployeeByIdUseCase';


interface IParams {
    id?: number
}

interface IQuery {
    employee_id?: number
}

export const deleteEmployeeByIdValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        employee_id: yup.number().integer().default(0).required(),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().default(0).required(),
    }))
}));

export const deleteEmployeeById = async (request: Request<IParams,{},{}, IQuery>, response: Response) => {

    const params = request.params;
    const query = request.query;

    const deletedEmployee = await deleteEmployeeByIdUseCase(Number(params.id), Number(query.employee_id));

    if(deletedEmployee instanceof Error) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: deletedEmployee.message
            }
        });
    }

    return response.status(StatusCodes.OK).json(deletedEmployee);

}; 