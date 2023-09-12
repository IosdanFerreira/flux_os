import { prismaMock } from '../../../tests/PrismaMockProvider';
import { createVehicleUseCase } from './CreateVehicleUseCase';
import { IVehicle } from '../../../entities/Vehicle';

interface IVehicleMock extends IVehicle{
    user_id: number,
    created_at: Date,
    updated_at: Date,
}

const newVehicle: IVehicleMock = {
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

describe('Create vehicle Tests', () => {
    it('Should create a new vehicle and return your id', async () => {

        prismaMock.vehicle.create.mockResolvedValue(newVehicle);

        await expect(createVehicleUseCase(newVehicle)).resolves.toEqual(1);
    });

    it('Should return Error if throw any error', async () => {

        prismaMock.vehicle.create.mockImplementation();

        await expect(createVehicleUseCase(newVehicle)).resolves.toEqual(
            new Error('Erro ao cadastrar o veículo')
        );
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await createVehicleUseCase(newVehicle);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



