import * as createClient from './CreateClient/CreateClientController';
import * as getAllClients from './GetAllClients/GetAllClientsController';

export const clientsUseCase = {
    ...createClient,
    ...getAllClients
};