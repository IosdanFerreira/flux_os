import * as createWorkOrder from './CreateWorkOrder/CreateWorkOrderController';
import * as getAllWorkOrders from './GetAllWorkOrders/GetAllWorkOrdersController';
import * as getWorkOrderById from './GetWorkOrderById/GetWorkOrderByIdController';
import * as updateWorkOrderById from './UpdateWorkOrderById/UpdateWorkOrderByIdController';

export const workOrderUseCase = {
    ...createWorkOrder,
    ...getAllWorkOrders,
    ...getWorkOrderById,
    ...updateWorkOrderById,
};