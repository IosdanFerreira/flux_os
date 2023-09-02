import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { createEmployeeUseCase } from './CreateEmployeeUseCase';
import { ICreateEmployeeRequestDTO } from './CreateEmployeeDTO';


interface IBody extends ICreateEmployeeRequestDTO {}

export const createEmployeeValidation = validation((getSchema) => ({
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
        user_id: yup.number().required().integer(),
    }))
}));

export const createEmployee = async (request: Request<{}, {}, IBody>, response: Response) => {

    const createdEmployee = await createEmployeeUseCase(request.body);
    
    if(createdEmployee instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                message: createdEmployee.message
            }
        });
    }

    return response.status(StatusCodes.CREATED).json(createdEmployee);
};