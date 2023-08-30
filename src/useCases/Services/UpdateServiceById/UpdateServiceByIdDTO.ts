import { IService } from '../../../entities/Service';


export interface IUpdateServiceByIdRequestDTO extends Omit<IService, 'id' | 'user_id'> {}