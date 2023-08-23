import { User } from '../../entities/User';

export interface ICreateUserRequestDTO extends Omit<User, 'id'> {}