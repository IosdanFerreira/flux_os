import { IEmployee } from '../../../entities/Employee';

export interface IGetAllEmployeesRequestDTO extends  Omit<IEmployee, 'user_id' | 'client_id'> {}