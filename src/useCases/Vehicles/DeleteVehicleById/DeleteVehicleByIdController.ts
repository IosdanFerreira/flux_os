import { Request, Response } from 'express';
import { validation } from '../../../shared/middleware/Validation';
import * as yup from 'yup';
import { deleteVehicleByIdUseCase } from './DeleteVehicleByIdUseCase';
import { StatusCodes } from 'http-status-codes';


interface IParams {
    id?: number
}

interface IQuery {
    vehicle_id?: number
}

export const deleteVehicleByIdValidation = validation((getSchema) => ({
    query: getSchema<IQuery>(yup.object().shape({
        vehicle_id: yup.number().integer().default(0).required(),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().default(0).required(),
    }))
}));

export const deleteVehicleById = async (request: Request<IParams,{},{}, IQuery>, response: Response) => {

    const params = request.params;
    const query = request.query;

    const deletedVehicle = await deleteVehicleByIdUseCase(Number(params.id), Number(query.vehicle_id));

    if(deletedVehicle instanceof Error) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: deletedVehicle.message
            }
        });
    }

    return response.status(StatusCodes.OK).json(deletedVehicle);

}; 