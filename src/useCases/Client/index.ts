import * as createClient from './CreateClient/CreateClientController';
import * as getAllClients from './GetAllClients/GetAllClientsController';
import * as getClientById from './GetClientById/GetClientByIdController';

export const clientsUseCase = {
    ...createClient,
    ...getAllClients,
    ...getClientById
};