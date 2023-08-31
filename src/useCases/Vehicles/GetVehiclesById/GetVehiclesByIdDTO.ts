import { IVehicle } from '../../../entities/Vehicle';


export interface IGetVehicleByIdRequestDTO extends Omit<IVehicle, 'user_id' | 'client_id'> {}