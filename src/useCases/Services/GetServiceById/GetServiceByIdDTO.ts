import { IService } from '../../../entities/Service';


export interface IGetServiceByIdRequestDTO extends Omit<IService, 'user_id'> {}