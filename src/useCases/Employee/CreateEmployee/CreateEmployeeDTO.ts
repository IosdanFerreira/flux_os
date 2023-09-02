import { IEmployee } from '../../../entities/Employee';

export interface ICreateEmployeeRequestDTO extends Omit<IEmployee, 'id'> {}