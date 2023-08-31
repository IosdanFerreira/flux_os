import { IVehicle } from '../../../entities/Vehicle';

export interface IGetAllVehiclesRequestDTO extends  Omit<IVehicle, 'user_id' | 'client_id'> {}