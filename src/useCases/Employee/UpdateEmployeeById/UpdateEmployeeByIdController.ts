import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { updateEmployeeByIdUseCase } from './UpdateEmployeeByIdUseCase';
import { IUpdateEmployeeByIdRequestDTO } from './UpdateEmployeeByIdDTO';

interface IBody extends IUpdateEmployeeByIdRequestDTO {}

interface IParams {
    id?: number
}

interface IQuery {
    employee_id?: number
}

export const updateEmployeeByIdValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({
        name: yup.string().required().min(3),
        surname: yup.string().required(),
        email: yup.string().required().email(),
        phone: yup.string().required(),
        commission: yup.number().required().integer(),
        cpf: yup.string().required(),
        rg: yup.string().required(),
        gender: yup.string().required(),
        cep: yup.string().required(),
        street: yup.string().required(),
        number_house: yup.string().required(),
        neighborhood: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required(),
        comments: yup.string().required(),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().required().default(0).integer()
    })),
    query: getSchema<IQuery>(yup.object().shape({
        employee_id: yup.number().required().default(0).integer()
    })),
}));

export const updateEmployeeById = async (request: Request<IParams, {}, IBody, IQuery>, response: Response) => {

    const params = request.params;
    const body = request.body;
    const query = request.query;

    if(!params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O id do usuário deve ser informado como parâmetro'
            }
        });
    } else if(!query.employee_id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O id do funcionário deve ser informado na consulta'
            }
        });
    }

    const updatedEmployee = await updateEmployeeByIdUseCase(Number(params.id), Number(query.employee_id), body);

    if(updatedEmployee instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: updatedEmployee.message
            }
        });
    }

    return response.status(StatusCodes.OK).json(updatedEmployee);
};