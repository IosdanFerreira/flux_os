import { Router } from 'express';

import { usersUseCase } from '../useCases/User';
import { clientsUseCase } from '../useCases/Client';

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

export {routes};