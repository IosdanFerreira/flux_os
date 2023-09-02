import { IEmployee } from '../../../entities/Employee';


export interface IGetEmployeeByIdRequestDTO extends Omit<IEmployee, 'user_id' | 'client_id'> {}