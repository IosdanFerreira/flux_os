import { prismaMock } from '../../../tests/PrismaMockProvider';
import { IClient } from '../../../entities/Client';
import { deleteServiceByIdUseCase } from './DeleteServiceByIdUseCase';
import { IService } from '../../../entities/Service';

const serviceMock: IService = {
    id: 1,
    name: 'Corte de cabelo - feminino',
    price: 3500,
    description: 'Teste',
    estimated_time: '00:30',
    user_id: 1
};

describe('Delete Service by ID Tests', () => {
    it('Should return null if service is deleted', async () => {

        prismaMock.service.delete.mockResolvedValue(serviceMock);

        const result = await deleteServiceByIdUseCase(1, 1);

        expect(result).toBeUndefined();

        expect(prismaMock.service.delete).toHaveBeenCalledWith({
            where: {
                user_id: 1,
                id: 1,
            },
        });
    });

    it('Should handle deletion failure and return an error', async () => {
        prismaMock.service.delete.mockImplementation();

        const result = await deleteServiceByIdUseCase(1, 1);

        expect(result).toBeInstanceOf(Error);

        expect(prismaMock.service.delete).toHaveBeenCalledWith({
            where: {
                user_id: 1,
                id: 1,
            },
        });
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await deleteServiceByIdUseCase(1, 1);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



