import { Router } from 'express';

import { usersUseCase } from '../useCases/User';
import { clientsUseCase } from '../useCases/Client';
import { servicesUseCase } from '../useCases/Services';
import { vehiclesUseCase } from '../useCases/Vehicles';
import { employeesUseCase } from '../useCases/Employee';
import { paymentOptionsUseCase } from '../useCases/PaymentOptions';
import { paymentSituationsUseCase } from '../useCases/PaymentSituations';

const routes = Router();

// Users routes
routes.post(
    '/signUp',
    usersUseCase.signUpValidation,
    usersUseCase.signUp
);
routes.post(
    '/signIn',
    usersUseCase.signInValidation,
    usersUseCase.sigIn
);

// Clients routes
routes.post(
    '/clients/insert',
    clientsUseCase.createClientValidation,
    clientsUseCase.createClient,
);
routes.get(
    '/clients/getAll/:id',
    clientsUseCase.getAllClientsValidation,
    clientsUseCase.getAllClients,
);
routes.get(
    '/clients/getById/:id',
    clientsUseCase.getClientByIdValidation,
    clientsUseCase.getClientById,
);
routes.put(
    '/clients/updateById/:id',
    clientsUseCase.updateClientByIdValidation,
    clientsUseCase.updateClientById,
);
routes.delete(
    '/clients/deleteById/:id',
    clientsUseCase.deleteClientByIdValidation,
    clientsUseCase.deleteClientById,
);

// Services routes
routes.post(
    '/services/insert',
    servicesUseCase.createServiceValidation,
    servicesUseCase.createService
);
routes.get(
    '/services/getAll/:id',
    servicesUseCase.getAllServicesValidation,
    servicesUseCase.getAllServices
);
routes.get(
    '/services/getById/:id',
    servicesUseCase.getServiceByIdValidation,
    servicesUseCase.getServiceById
);
routes.put(
    '/services/updateById/:id',
    servicesUseCase.updateServiceByIdValidation,
    servicesUseCase.updateServiceById
);
routes.delete(
    '/services/deleteById/:id',
    servicesUseCase.deleteServiceByIdValidation,
    servicesUseCase.deleteServiceById
);

// Vehicles routes
routes.post(
    '/vehicles/insert',
    vehiclesUseCase.createVehicleValidation,
    vehiclesUseCase.createVehicle
);
routes.get(
    '/vehicles/getAll/:id',
    vehiclesUseCase.getAllVehiclesValidation,
    vehiclesUseCase.getAllVehicles,
);
routes.get(
    '/vehicles/getById/:id',
    vehiclesUseCase.getVehicleByIdValidation,
    vehiclesUseCase.getVehicleById,
);
routes.put(
    '/vehicles/updateById/:id',
    vehiclesUseCase.updateVehicleByIdValidation,
    vehiclesUseCase.updateVehicleById,
);
routes.delete(
    '/vehicles/deleteById/:id',
    vehiclesUseCase.deleteVehicleByIdValidation,
    vehiclesUseCase.deleteVehicleById,
);

// Employees routes
routes.post(
    '/employees/insert',
    employeesUseCase.createEmployeeValidation,
    employeesUseCase.createEmployee,
);
routes.get(
    '/employees/getAll/:id',
    employeesUseCase.getAllEmployeesValidation,
    employeesUseCase.getAllEmployees,
);
routes.get(
    '/employees/getById/:id',
    employeesUseCase.getEmployeeByIdValidation,
    employeesUseCase.getEmployeeById,
);
routes.put(
    '/employees/updateById/:id',
    employeesUseCase.updateEmployeeByIdValidation,
    employeesUseCase.updateEmployeeById,
);
routes.delete(
    '/employees/deleteById/:id',
    employeesUseCase.deleteEmployeeByIdValidation,
    employeesUseCase.deleteEmployeeById,
);

// Payment Options routes
routes.get(
    '/paymentOptions/getAll',
    paymentOptionsUseCase.getAllPaymentOptionsValidation,
    paymentOptionsUseCase.getAllPaymentOptions,
);

// Payment Situations routes
routes.get(
    '/paymentSituations/getAll',
    paymentSituationsUseCase.getAllPaymentSituationsValidation,
    paymentSituationsUseCase.getAllPaymentSituations,
);

export {routes};