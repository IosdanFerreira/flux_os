import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { IUpdateWorkOrderByIdRequestDTO } from './UpdateWorkOrderByIdDTO';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { updateWorkOrderByIdUseCase } from './UpdateWorkOrderByIdUseCase';

interface IBody extends IUpdateWorkOrderByIdRequestDTO {}

interface IParams {
    id?: number
}

interface IQuery {
    work_order_id?: number
}

export const updateWorkOrderByIdValidation = validation((getSchema) => ({
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
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().required().default(0).integer()
    })),
    query: getSchema<IQuery>(yup.object().shape({
        work_order_id: yup.number().required().default(0).integer()
    })),
}));

export const updateWorkOrderById = async (request: Request<IParams, {}, IBody, IQuery>, response: Response) => {

    const params = request.params;
    const body = request.body;
    const query = request.query;
    
    if(!params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O id do usuário deve ser informado como parâmetro'
            }
        });
    } else if(!query.work_order_id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O id da ordem de serviço deve ser informado na consulta'
            }
        });
    }
    
    const updatedWorkOrder = await updateWorkOrderByIdUseCase(Number(params.id), Number(query.work_order_id), body);

    if(updatedWorkOrder instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: updatedWorkOrder.message
            }
        });
    }


    return response.status(StatusCodes.OK).json(updatedWorkOrder);
};