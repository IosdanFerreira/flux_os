import { prismaMock } from '../../../tests/PrismaMockProvider';
import { createWorkOrderUseCase } from './CreateWorkOrderUseCase';
import { IWorkOrders } from '../../../entities/WorkOrders';

interface IWorkOrderMock extends IWorkOrders{
    created_at: Date,
    updated_at: Date,
}

const newWorkOrder: IWorkOrderMock = {
    id:1,
    client_id: 2,
    vehicle_id: 2,
    employee_id: 2,
    services_id: [1, 2],
    init_date: '2023-09-06',
    init_time: 'time',
    end_date: '2023-09-07',
    end_time: 'time',
    payment_form_id: 2,
    payment_situation_id: 2,
    comments: 'teste',
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
};

describe('Create work order Tests', () => {
    it('Should create a new client and return your id', async () => {

        prismaMock.workOrder.create.mockResolvedValue(newWorkOrder);

        await expect(createWorkOrderUseCase(newWorkOrder)).resolves.toEqual(1);
    });

    it('Should return Error if throw any error', async () => {

        prismaMock.workOrder.create.mockImplementation();

        await expect(createWorkOrderUseCase(newWorkOrder)).resolves.toEqual(
            new Error('Erro ao cadastrar a ordem de serviço')
        );
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await createWorkOrderUseCase(newWorkOrder);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



