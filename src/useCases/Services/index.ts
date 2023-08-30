import * as createService from './CreateService/CreateServiceController';
import * as getAllServices from './GetAllServices/GetAllServicesController';
import * as getServiceById from './GetServiceById/GetServiceByIdController';
import * as updateServiceById from './UpdateServiceById/UpdateServiceByIdController';
import * as deleteById from './DeleteServiceById/DeleteServiceByIdController';

export const servicesUseCase = {
    ...createService,
    ...getAllServices,
    ...getServiceById,
    ...updateServiceById,
    ...deleteById,
};