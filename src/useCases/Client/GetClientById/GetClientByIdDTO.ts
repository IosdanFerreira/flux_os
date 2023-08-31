import { IClient } from '../../../entities/Client';


export interface IGetClientByIdRequestDTO extends Omit<IClient, 'user_id'> {}