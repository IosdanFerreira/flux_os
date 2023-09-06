import { IWorkOrders } from '../../../entities/WorkOrders';


export interface IGetAllWorkOrdersRequestDTO extends Omit<IWorkOrders, 'user_id' | 'services_id' | 'client_id' | 'employee_id' | 'vehicle_id' | 'payment_form_id' | 'payment_situation_id'> {}