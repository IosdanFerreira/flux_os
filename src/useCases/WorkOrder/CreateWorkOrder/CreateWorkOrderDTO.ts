import { IClient } from '../../../entities/Client';


export interface ICreateClientRequestDTO extends Omit<IClient, 'id'> {}