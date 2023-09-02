import { IClient } from '../../../entities/Client';


export interface IUpdateClientByIdRequestDTO extends Omit<IClient, 'id' | 'user_id'> {}