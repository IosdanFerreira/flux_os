import { IClient } from '../../../entities/Client';


export interface IGetAllClientsRequestDTO extends Omit<IClient, 'user_id'> {}