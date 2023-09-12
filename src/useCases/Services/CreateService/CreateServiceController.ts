import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import { ICreateServiceRequestDTO } from './CreateServiceDTO';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { createServiceUseCase } from './CreateServiceUseCase';


interface IBody extends ICreateServiceRequestDTO {}

export const createServiceValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({
        name: yup.string().required().min(3),
        price: yup.number().required(),
        description: yup.string().required(),
        estimated_time: yup.string().required(),
        user_id: yup.number().required().integer(),
    }))
}));

export const createService = async (request: Request<{}, {}, IBody>, response: Response) => {

    const createdService = await createServiceUseCase(request.body);
    
    if(createdService instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                message: createdService.message
            }
        });
    }

    return response.status(StatusCodes.CREATED).json(createdService);
};