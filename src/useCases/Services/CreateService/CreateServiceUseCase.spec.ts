import { prismaMock } from '../../../tests/PrismaMockProvider';
import { createServiceUseCase } from './CreateServiceUseCase';
import { IService } from '../../../entities/Service';

const newService: IService = {
    id: 1,
    name: 'Corte de cabelo - feminino',
    price: 3500,
    description: 'Teste',
    estimated_time: '00:30',
    user_id: 1
};

describe('Create Service Tests', () => {
    it('Should create a new service and return your id', async () => {

        prismaMock.service.create.mockResolvedValue(newService);

        await expect(createServiceUseCase(newService)).resolves.toEqual(1);
    });

    it('Should return Error if throw any error', async () => {

        prismaMock.service.create.mockImplementation();

        await expect(createServiceUseCase(newService)).resolves.toEqual(
            new Error('Erro ao cadastrar o serviço')
        );
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await createServiceUseCase(newService);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



