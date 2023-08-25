import { User } from '../../../entities/User';

export interface IFindByEmailRequestDTO extends Omit<User, 'id' | 'name' | 'surname'> {}