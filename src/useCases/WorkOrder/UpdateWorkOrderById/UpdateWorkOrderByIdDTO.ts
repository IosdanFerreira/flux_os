import { IWorkOrders } from '../../../entities/WorkOrders';


export interface IUpdateWorkOrderByIdRequestDTO extends Omit<IWorkOrders, 'id'> {}