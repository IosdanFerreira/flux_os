import { IVehicle } from '../../../entities/Vehicle';


export interface IUpdateVehicleByIdRequestDTO extends Omit<IVehicle, 'id' | 'user_id' | 'client_id'> {}