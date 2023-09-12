import { prismaMock } from '../../../tests/PrismaMockProvider';
import { getServiceByIdUseCase } from './GetServiceByIdUseCase';
import { IService } from '../../../entities/Service';

const ServiceMock: IService = {
    
    id: 1,
    name: 'Corte de cabelo - feminino',
    price: 3500,
    description: 'Teste',
    estimated_time: '00:30',
    user_id: 1
    
};

describe('Get service by ID Tests', () => {
    it('Should return service by ID', async () => {

        prismaMock.service.findUnique.mockResolvedValue(ServiceMock);

        const foundUser = await getServiceByIdUseCase(1, 1);

        expect(foundUser).toBeDefined();

        expect(foundUser).toEqual(ServiceMock);

    });

    it('Should return an error for non-existent client ID', async () => {
        // Configure o PrismaMock para retornar null, indicando que o cliente não existe
        prismaMock.service.findUnique.mockResolvedValue(null);
    
        const notFoundUser = await getServiceByIdUseCase(1, 123); // ID de cliente que não existe
    
        expect(notFoundUser).toBeInstanceOf(Error);
        expect(notFoundUser).toEqual(new Error('Nenhum registro encontrado!'));
    });
    it('Should return an error for non-existent user ID', async () => {
        // Configure o PrismaMock para retornar null, indicando que o cliente não existe
        prismaMock.service.findUnique.mockResolvedValue(null);
    
        const notFoundUser = await getServiceByIdUseCase(16546, 123); // ID de cliente que não existe
    
        expect(notFoundUser).toBeInstanceOf(Error);
        expect(notFoundUser).toEqual(new Error('Nenhum registro encontrado!'));
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await getServiceByIdUseCase(1, 1);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



