import * as createVehicle from './CreateVehicle/CreateVehicleController';
import * as getAllVehicles from './GetAllVehicles/GetAllVehiclesController';
import * as getVehicleById from './GetVehiclesById/GetVehiclesByIdController';
import * as updateVehicleById from './UpdateVehicleById/UpdateVehicleByIdController';
import * as deleteVehicleById from './DeleteVehicleById/DeleteVehicleByIdController';

export const vehiclesUseCase = {
    ...createVehicle,
    ...getAllVehicles,
    ...getVehicleById,
    ...updateVehicleById,
    ...deleteVehicleById
};