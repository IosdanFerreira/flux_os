import { prismaMock } from '../../../tests/PrismaMockProvider';
import { getAllServicesUseCase } from './GetAllServicesUseCase';
import { IService } from '../../../entities/Service';

const allSevicesMock: IService[] = [
    {
        id: 1,
        name: 'Corte de cabelo - feminino',
        price: 3500,
        description: 'Teste',
        estimated_time: '00:30',
        user_id: 1
    },
    {
        id: 2,
        name: 'Corte de cabelo - masculino',
        price: 3500,
        description: 'Teste',
        estimated_time: '00:30',
        user_id: 1
    },
    {
        id: 2,
        name: 'Corte de cabelo - infantil',
        price: 3500,
        description: 'Teste',
        estimated_time: '00:30',
        user_id: 1
    },
];

describe('Get all services Tests', () => {
    it('Should return all services data', async () => {

        prismaMock.service.findMany.mockResolvedValue(allSevicesMock);

        const foundAllUsers = await getAllServicesUseCase(1, '', 10, 1);

        expect(foundAllUsers).toBeDefined();

        expect(foundAllUsers).toEqual(allSevicesMock);
    });

    it('Should return empty array for non-existent user_id', async () => {

        prismaMock.service.findMany.mockResolvedValue([]);

        const notFoundClientsByUserId = await getAllServicesUseCase(1, '', 10, 999);

        expect(notFoundClientsByUserId).toEqual([]);
    });

    it('Should return Erro if throw any error', async () => {

        prismaMock.service.findMany.mockImplementation();

        const resultError = await getAllServicesUseCase(1, '', 10, 999);

        expect(resultError).toEqual(new Error('Erro ao consultar todos os serviços'));
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await getAllServicesUseCase(1, '', 10, 1);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });

});



