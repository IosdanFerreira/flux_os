import { prismaMock } from '../../../tests/PrismaMockProvider';
import { getAllVehiclesUseCase } from './GetAllVehiclesUseCase';
import { IVehicle } from '../../../entities/Vehicle';

interface IVehicleMock extends IVehicle{
    user_id: number,
    created_at: Date,
    updated_at: Date,
}

const allVehiclesMock: IVehicleMock[] = [
    {
        id: 1,
        make: 'Gol 2 ',
        model: 'Teste 2',
        plate: '123654',
        color: 'Vermelho',
        comments: 'Comentário teste',
        user_id: 1,
        client_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 1,
        make: 'Gol 3',
        model: 'Teste 3',
        plate: '123654',
        color: 'Vermelho',
        comments: 'Comentário teste',
        user_id: 1,
        client_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
];

describe('Get all vehicles Tests', () => {
    it('Should return all vehicles data', async () => {

        prismaMock.vehicle.findMany.mockResolvedValue(allVehiclesMock);

        const foundAllUsers = await getAllVehiclesUseCase(1, '', 10, 1);

        expect(foundAllUsers).toBeDefined();

        expect(foundAllUsers).toEqual(allVehiclesMock);
    });

    it('Should return empty array for non-existent user_id', async () => {

        prismaMock.vehicle.findMany.mockResolvedValue([]);

        const notFoundClientsByUserId = await getAllVehiclesUseCase(1, '', 10, 999);

        expect(notFoundClientsByUserId).toEqual([]);
    });

    it('Should return Erro if throw any error', async () => {

        prismaMock.vehicle.findMany.mockImplementation();

        const resultError = await getAllVehiclesUseCase(1, '', 10, 999);

        expect(resultError).toEqual(new Error('Erro ao consultar todos os veículos'));
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await getAllVehiclesUseCase(1, '', 10, 1);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });

});



