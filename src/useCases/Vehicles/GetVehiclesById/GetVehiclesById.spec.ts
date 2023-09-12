import { prismaMock } from '../../../tests/PrismaMockProvider';
import { getVehicleByIdUseCase } from './GetVehiclesByIdUseCase';
import { IVehicle } from '../../../entities/Vehicle';

interface IVehicleMock extends IVehicle{
    user_id: number,
    created_at: Date,
    updated_at: Date,
}

const vehicleMock: IVehicleMock = {
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
};

describe('Get vehicle by ID Tests', () => {
    it('Should return vehicle by ID', async () => {

        prismaMock.vehicle.findUnique.mockResolvedValue(vehicleMock);

        const foundUser = await getVehicleByIdUseCase(1, 1);

        expect(foundUser).toBeDefined();

        expect(foundUser).toEqual(vehicleMock);

    });

    it('Should return an error for non-existent vehicle ID', async () => {
        prismaMock.vehicle.findUnique.mockResolvedValue(null);
    
        const notFoundUser = await getVehicleByIdUseCase(1, 123);
    
        expect(notFoundUser).toBeInstanceOf(Error);
        expect(notFoundUser).toEqual(new Error('Nenhum registro encontrado!'));
    });
    it('Should return an error for non-existent user ID', async () => {
        // Configure o PrismaMock para retornar null, indicando que o cliente não existe
        prismaMock.vehicle.findUnique.mockResolvedValue(null);
    
        const notFoundUser = await getVehicleByIdUseCase(16546, 123); // ID de cliente que não existe
    
        expect(notFoundUser).toBeInstanceOf(Error);
        expect(notFoundUser).toEqual(new Error('Nenhum registro encontrado!'));
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await getVehicleByIdUseCase(1, 1);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



