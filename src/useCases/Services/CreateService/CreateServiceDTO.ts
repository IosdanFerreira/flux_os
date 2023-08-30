import { IService } from '../../../entities/Service';

export interface ICreateServiceRequestDTO extends Omit<IService, 'id'> {}