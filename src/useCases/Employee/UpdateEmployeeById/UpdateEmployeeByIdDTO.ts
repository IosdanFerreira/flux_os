import { IEmployee } from '../../../entities/Employee';


export interface IUpdateEmployeeByIdRequestDTO extends Omit<IEmployee, 'id' | 'user_id'> {}