import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { IUpdateVehicleByIdRequestDTO } from './UpdateVehicleByIdDTO';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { updateVehicleByIdUseCase } from './UpdateVehicleByIdUseCase';

interface IBody extends IUpdateVehicleByIdRequestDTO {}

interface IParams {
    id?: number
}

interface IQuery {
    vehicle_id?: number
}

export const updateVehicleByIdValidation = validation((getSchema) => ({
    body: getSchema<IBody>(yup.object().shape({
        make: yup.string().required(),
        model: yup.string().required(),
        plate: yup.string().required(),
        color: yup.string().required(),
        comments: yup.string().required(),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().required().default(0).integer()
    })),
    query: getSchema<IQuery>(yup.object().shape({
        vehicle_id: yup.number().required().default(0).integer()
    })),
}));

export const updateVehicleById = async (request: Request<IParams, {}, IBody, IQuery>, response: Response) => {

    const params = request.params;
    const body = request.body;
    const query = request.query;

    if(!params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O id do usuário deve ser informado como parâmetro'
            }
        });
    } else if(!query.vehicle_id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O id do veículo deve ser informado na consulta'
            }
        });
    }

    const updatedVehicle = await updateVehicleByIdUseCase(Number(params.id), Number(query.vehicle_id), body);

    if(updatedVehicle instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: updatedVehicle.message
            }
        });
    }

    return response.status(StatusCodes.OK).json(updatedVehicle);
};