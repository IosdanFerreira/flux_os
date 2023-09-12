import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { ICreateVehicleRequestDTO } from './CreateVehicleDTO';
import { createVehicleUseCase } from './CreateVehicleUseCase';


interface IBody extends ICreateVehicleRequestDTO {}

export const createVehicleValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({
        make: yup.string().required(),
        model: yup.string().required(),
        plate: yup.string().required(),
        color: yup.string().required(),
        comments: yup.string().required(),
        user_id: yup.number().required().integer(),
        client_id: yup.number().required().integer()
    }))
}));

export const createVehicle = async (request: Request<{}, {}, IBody>, response: Response) => {

    const createdService = await createVehicleUseCase(request.body);
    
    if(createdService instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                message: createdService.message
            }
        });
    }

    return response.status(StatusCodes.CREATED).json(createdService);
};