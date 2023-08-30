import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { IUpdateServiceByIdRequestDTO } from './UpdateServiceByIdDTO';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { updateServiceByIdUseCase } from './UpdateServiceByIdUseCase';

interface IBody extends IUpdateServiceByIdRequestDTO {}

interface IParams {
    id?: number
}

interface IQuery {
    service_id?: number
}

export const updateServiceByIdValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({
        name: yup.string().required().min(3),
        price: yup.number().required(),
        description: yup.string().nullable(),
        estimated_time: yup.string().required(),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().required().default(0).integer()
    })),
    query: getSchema<IQuery>(yup.object().shape({
        service_id: yup.number().required().default(0).integer()
    })),
}));

export const updateServiceById = async (request: Request<IParams, {}, IBody, IQuery>, response: Response) => {

    const params = request.params;
    const body = request.body;
    const query = request.query;

    if(!params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O id do usuário deve ser informado como parâmetro'
            }
        });
    } else if(!query.service_id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O id do serviço deve ser informado na consulta'
            }
        });
    }

    const updatedService = await updateServiceByIdUseCase(Number(params.id), Number(query.service_id), body);

    if(updatedService instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: updatedService.message
            }
        });
    }

    return response.status(StatusCodes.OK).json(updatedService);
};