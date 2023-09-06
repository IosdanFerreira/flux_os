import { IWorkOrders } from '../../../entities/WorkOrders';


export interface ICreateWorkOrderRequestDTO extends Omit<IWorkOrders, 'id'> {}