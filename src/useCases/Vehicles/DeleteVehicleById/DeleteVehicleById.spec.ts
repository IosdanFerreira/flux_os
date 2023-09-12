import { prismaMock } from '../../../tests/PrismaMockProvider';
import { deleteVehicleByIdUseCase } from './DeleteVehicleByIdUseCase';
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


describe('Delete vehicle by ID Tests', () => {
    it('Should return null if vehicle is deleted', async () => {

        prismaMock.vehicle.delete.mockResolvedValue(vehicleMock);

        const result = await deleteVehicleByIdUseCase(1, 1);

        expect(result).toBeUndefined();

        expect(prismaMock.vehicle.delete).toHaveBeenCalledWith({
            where: {
                user_id: 1,
                id: 1,
            },
        });
    });

    it('Should handle deletion failure and return an error', async () => {
        prismaMock.vehicle.delete.mockImplementation();

        const result = await deleteVehicleByIdUseCase(1, 1);

        expect(result).toBeInstanceOf(Error);

        expect(prismaMock.vehicle.delete).toHaveBeenCalledWith({
            where: {
                user_id: 1,
                id: 1,
            },
        });
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await deleteVehicleByIdUseCase(1, 1);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



