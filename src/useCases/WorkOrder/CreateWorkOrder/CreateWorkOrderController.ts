import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { ICreateWorkOrderRequestDTO } from './CreateWorkOrderDTO';
import { createWorkOrderUseCase } from './CreateWorkOrderUseCase';


interface IBody extends ICreateWorkOrderRequestDTO {}

export const createWorkOrderValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({
        client_id: yup.number().required(),
        vehicle_id: yup.number().required(),
        employee_id: yup.number().required(),
        services_id: yup.array().required(),
        init_date: yup.string().required(),
        init_time: yup.string().required(),
        end_date: yup.string().required(),
        end_time: yup.string().required(),
        payment_form_id: yup.number().required(),
        payment_situation_id: yup.number().required(),
        comments: yup.string().required(),
        user_id: yup.number().required(),
    }))
}));

export const createWorkOrder = async (request: Request<{}, {}, IBody>, response: Response) => {

    const createdWorkOrder = await createWorkOrderUseCase(request.body);
    
    if(createdWorkOrder instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                message: createdWorkOrder.message
            }
        });
    }

    return response.status(StatusCodes.CREATED).json(createdWorkOrder);
};