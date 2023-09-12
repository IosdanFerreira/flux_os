import { Router } from 'express';

import { usersUseCase } from '../useCases/User';
import { clientsUseCase } from '../useCases/Client';
import { servicesUseCase } from '../useCases/Services';
import { vehiclesUseCase } from '../useCases/Vehicles';
import { employeesUseCase } from '../useCases/Employee';
import { paymentOptionsUseCase } from '../useCases/PaymentOptions';
import { paymentSituationsUseCase } from '../useCases/PaymentSituations';
import { workOrderUseCase } from '../useCases/WorkOrder';
import { ensuredAuthenticated } from '../shared/middleware/EnsuredAuthenticated';
import { refreshTokenController } from '../useCases/RefreshToken';

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
routes.post(
    '/refreshToken',
    refreshTokenController.refreshTokenValidation,
    refreshTokenController.refreshToken,
);

// Clients routes
routes.post(
    '/clients/insert',
    ensuredAuthenticated(),
    clientsUseCase.createClientValidation,
    clientsUseCase.createClient,
);
routes.get(
    '/clients/getAll/:id',
    ensuredAuthenticated(),
    clientsUseCase.getAllClientsValidation,
    clientsUseCase.getAllClients,
);
routes.get(
    '/clients/getById/:id',
    ensuredAuthenticated(),
    clientsUseCase.getClientByIdValidation,
    clientsUseCase.getClientById,
);
routes.put(
    '/clients/updateById/:id',
    ensuredAuthenticated(),
    clientsUseCase.updateClientByIdValidation,
    clientsUseCase.updateClientById,
);
routes.delete(
    '/clients/deleteById/:id',
    ensuredAuthenticated(),
    clientsUseCase.deleteClientByIdValidation,
    clientsUseCase.deleteClientById,
);

// Services routes
routes.post(
    '/services/insert',
    ensuredAuthenticated(),
    servicesUseCase.createServiceValidation,
    servicesUseCase.createService
);
routes.get(
    '/services/getAll/:id',
    ensuredAuthenticated(),
    servicesUseCase.getAllServicesValidation,
    servicesUseCase.getAllServices
);
routes.get(
    '/services/getById/:id',
    ensuredAuthenticated(),
    servicesUseCase.getServiceByIdValidation,
    servicesUseCase.getServiceById
);
routes.put(
    '/services/updateById/:id',
    ensuredAuthenticated(),
    servicesUseCase.updateServiceByIdValidation,
    servicesUseCase.updateServiceById
);
routes.delete(
    '/services/deleteById/:id',
    ensuredAuthenticated(),
    servicesUseCase.deleteServiceByIdValidation,
    servicesUseCase.deleteServiceById
);

// Vehicles routes
routes.post(
    '/vehicles/insert',
    ensuredAuthenticated(),
    vehiclesUseCase.createVehicleValidation,
    vehiclesUseCase.createVehicle
);
routes.get(
    '/vehicles/getAll/:id',
    ensuredAuthenticated(),
    vehiclesUseCase.getAllVehiclesValidation,
    vehiclesUseCase.getAllVehicles,
);
routes.get(
    '/vehicles/getById/:id',
    ensuredAuthenticated(),
    vehiclesUseCase.getVehicleByIdValidation,
    vehiclesUseCase.getVehicleById,
);
routes.put(
    '/vehicles/updateById/:id',
    ensuredAuthenticated(),
    vehiclesUseCase.updateVehicleByIdValidation,
    vehiclesUseCase.updateVehicleById,
);
routes.delete(
    '/vehicles/deleteById/:id',
    ensuredAuthenticated(),
    vehiclesUseCase.deleteVehicleByIdValidation,
    vehiclesUseCase.deleteVehicleById,
);

// Employees routes
routes.post(
    '/employees/insert',
    ensuredAuthenticated(),
    employeesUseCase.createEmployeeValidation,
    employeesUseCase.createEmployee,
);
routes.get(
    '/employees/getAll/:id',
    ensuredAuthenticated(),
    employeesUseCase.getAllEmployeesValidation,
    employeesUseCase.getAllEmployees,
);
routes.get(
    '/employees/getById/:id',
    ensuredAuthenticated(),
    employeesUseCase.getEmployeeByIdValidation,
    employeesUseCase.getEmployeeById,
);
routes.put(
    '/employees/updateById/:id',
    ensuredAuthenticated(),
    employeesUseCase.updateEmployeeByIdValidation,
    employeesUseCase.updateEmployeeById,
);
routes.delete(
    '/employees/deleteById/:id',
    ensuredAuthenticated(),
    employeesUseCase.deleteEmployeeByIdValidation,
    employeesUseCase.deleteEmployeeById,
);

// Work Order routes
routes.post(
    '/workOrder/insert',
    ensuredAuthenticated(),
    workOrderUseCase.createWorkOrderValidation,
    workOrderUseCase.createWorkOrder
);
routes.get(
    '/workOrder/getAll/:id',
    ensuredAuthenticated(),
    workOrderUseCase.getAllWorkOrdersValidation,
    workOrderUseCase.getAllWorkOrders
);
routes.get(
    '/workOrder/getById/:id',
    ensuredAuthenticated(),
    workOrderUseCase.getWorkOrderByIdValidation,
    workOrderUseCase.getWorkOrderById
);
routes.put(
    '/workOrder/updateById/:id',
    ensuredAuthenticated(),
    workOrderUseCase.updateWorkOrderByIdValidation,
    workOrderUseCase.updateWorkOrderById
);

// Payment Options routes
routes.get(
    '/paymentOptions/getAll',
    ensuredAuthenticated(),
    paymentOptionsUseCase.getAllPaymentOptionsValidation,
    paymentOptionsUseCase.getAllPaymentOptions,
);

// Payment Situations routes
routes.get(
    '/paymentSituations/getAll',
    ensuredAuthenticated(),
    paymentSituationsUseCase.getAllPaymentSituationsValidation,
    paymentSituationsUseCase.getAllPaymentSituations,
);

export {routes};