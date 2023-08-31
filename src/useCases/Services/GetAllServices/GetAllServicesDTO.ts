import { IService } from '../../../entities/Service';

export interface IGetAllServicesRequestDTO extends Omit<IService, 'user_id'> {}