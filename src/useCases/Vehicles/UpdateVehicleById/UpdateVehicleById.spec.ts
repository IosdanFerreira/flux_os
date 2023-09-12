import { prismaMock } from '../../../tests/PrismaMockProvider';
import { updateVehicleByIdUseCase } from './UpdateVehicleByIdUseCase';
import { IVehicle } from '../../../entities/Vehicle';

interface IVehicleMock extends IVehicle{
    user_id: number,
    created_at: Date,
    updated_at: Date,
}

const vehicleMock: IVehicleMock = {
    id: 1,
    make: 'Gol 1',
    model: 'Teste 1',
    plate: '123654',
    color: 'Vermelho',
    comments: 'Comentário teste',
    user_id: 1,
    client_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
};

const updatedVehicle: IVehicleMock = {
    id: 2,
    make: 'Gol 2',
    model: 'Teste 2',
    plate: '123654',
    color: 'Vermelho',
    comments: 'Comentário teste',
    user_id: 1,
    client_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
};

describe('Update vehicle by ID Tests', () => {
    it('Should return null if vehicle is updated', async () => {

        prismaMock.vehicle.count.mockResolvedValue(1);
        prismaMock.vehicle.update.mockResolvedValue(updatedVehicle);

        const updateClient = await updateVehicleByIdUseCase(vehicleMock.user_id, vehicleMock.id, updatedVehicle);

        expect(updateClient).toBeUndefined();

        expect(prismaMock.vehicle.update).toHaveBeenCalledWith({
            where: {
                user_id: vehicleMock.user_id,
                id: vehicleMock.id,
            },
            data:{
                ...updatedVehicle
            }
        });
    });

    it('Should handle non-existent vehicle and return an error', async () => {

        prismaMock.vehicle.count.mockResolvedValue(0);

        const result = await updateVehicleByIdUseCase(vehicleMock.user_id, vehicleMock.id, updatedVehicle);

        expect(result).toBeInstanceOf(Error);
        expect(result).toEqual(new Error('Nenhum veículo foi encontrado'));

        expect(prismaMock.vehicle.update).not.toHaveBeenCalled();
    });
    it('Should return Erro if throw any error', async () => {

        prismaMock.vehicle.count.mockResolvedValue(1);
        prismaMock.vehicle.update.mockRejectedValue(new Error('Erro ao atualizar registro'));

        const result = await updateVehicleByIdUseCase(vehicleMock.user_id, vehicleMock.id, updatedVehicle);

        expect(result).toBeInstanceOf(Error);
        expect(result).toEqual(new Error('Erro ao atualizar registro'));

        expect(prismaMock.vehicle.update).toHaveBeenCalledWith({
            where: {
                user_id: vehicleMock.user_id,
                id: vehicleMock.id,
            },
            data:{
                ...updatedVehicle
            }
        });
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await updateVehicleByIdUseCase(vehicleMock.user_id, vehicleMock.id, updatedVehicle);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



