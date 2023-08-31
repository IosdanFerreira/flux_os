import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { getVehicleByIdUseCase } from './GetVehiclesByIdUseCase';
import { StatusCodes } from 'http-status-codes';

interface IParams {
    id?: number
}

interface IQuery {
    vehicle_id?: number
}

export const getVehicleByIdValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        vehicle_id: yup.number().integer().default(0).required(),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().default(0).required(),
    }))
}));

export const getVehicleById = async (request: Request<IParams, {}, {}, IQuery>, response: Response) => {

    const query = request.query;
    const params = request.params;

    if(!query.vehicle_id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'A consulta vehicle_id está ausente'
            }
        });
    }

    const vehicleById = await getVehicleByIdUseCase(Number(params.id), Number(query.vehicle_id));

    if(vehicleById instanceof Error) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                message: vehicleById.message
            }
        });
    }

    return response.status(StatusCodes.OK).json(vehicleById);

};