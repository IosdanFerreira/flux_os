import { IVehicle } from '../../../entities/Vehicle';

export interface ICreateVehicleRequestDTO extends Omit<IVehicle, 'id'> {}