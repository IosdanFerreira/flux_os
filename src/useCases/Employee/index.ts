import * as createEmployee from './CreateEmployee/CreateEmployeeController';
import * as getAllEmployees from './GetAllEmployees/GetAllEmployeesController';
import * as getEmployeeById from './GetEmployeeById/GetEmployeeByIdController';
import * as updateEmployeeById from './UpdateEmployeeById/UpdateEmployeeByIdController';
import * as deleteEmployeeById from './DeleteEmployeeById/DeleteEmployeeByIdController';

export const employeesUseCase = {
    ...createEmployee,
    ...getAllEmployees,
    ...getEmployeeById,
    ...updateEmployeeById,
    ...deleteEmployeeById,
};