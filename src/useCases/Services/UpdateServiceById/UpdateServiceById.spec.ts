import { prismaMock } from '../../../tests/PrismaMockProvider';
import { IClient } from '../../../entities/Client';
import { updateServiceByIdUseCase } from './UpdateServiceByIdUseCase';
import { IService } from '../../../entities/Service';

const serviceMock: IService = {
    id: 1,
    name: 'Corte de cabelo - feminino',
    price: 3500,
    description: 'Teste',
    estimated_time: '00:30',
    user_id: 1
};

const updatedService: IService = {
    id: 1,
    name: 'Corte de cabelo - feminino',
    price: 3500,
    description: 'Teste',
    estimated_time: '00:30',
    user_id: 1
};

describe('Update service by ID Tests', () => {
    it('Should return null if service is updated', async () => {

        prismaMock.service.count.mockResolvedValue(1);
        prismaMock.service.update.mockResolvedValue(updatedService);

        const updateClient = await updateServiceByIdUseCase(serviceMock.user_id, serviceMock.id, updatedService);

        expect(updateClient).toBeUndefined();

        expect(prismaMock.service.update).toHaveBeenCalledWith({
            where: {
                user_id: serviceMock.user_id,
                id: serviceMock.id,
            },
            data:{
                ...updatedService
            }
        });
    });

    it('Should handle non-existent service and return an error', async () => {

        prismaMock.service.count.mockResolvedValue(0);

        const result = await updateServiceByIdUseCase(serviceMock.user_id, serviceMock.id, updatedService);

        expect(result).toBeInstanceOf(Error);
        expect(result).toEqual(new Error('Nenhum serviço foi encontrado'));

        expect(prismaMock.service.update).not.toHaveBeenCalled();
    });
    it('Should return Erro if throw any error', async () => {

        prismaMock.service.count.mockResolvedValue(1);
        prismaMock.service.update.mockRejectedValue(new Error('Erro ao atualizar registro'));

        const result = await updateServiceByIdUseCase(serviceMock.user_id, serviceMock.id, updatedService);

        expect(result).toBeInstanceOf(Error);
        expect(result).toEqual(new Error('Erro ao atualizar registro'));

        expect(prismaMock.service.update).toHaveBeenCalledWith({
            where: {
                user_id: serviceMock.user_id,
                id: serviceMock.id,
            },
            data:{
                ...updatedService
            }
        });
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await updateServiceByIdUseCase(serviceMock.user_id, serviceMock.id, updatedService);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



