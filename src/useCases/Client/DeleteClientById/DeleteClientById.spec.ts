import { prismaMock } from '../../../tests/PrismaMockProvider';
import { IClient } from '../../../entities/Client';
import { DeleteClientByIdUseCase } from './DeleteClientByIdUseCase';

interface IClientMock extends IClient{
    user_id: number,
    created_at: Date,
    updated_at: Date,
}

const clientMock: IClientMock = {
    id: 1,
    name: 'Cliente',
    surname: 'Silva',
    email: 'teste@gmail.com',
    phone: null,
    cpf: '846.484.545-44',
    rg: null,
    gender: '84.484.445-44',
    cep: '48.609-050',
    street: 'R. Teste 1',
    number_house: '504',
    neighborhood: 'Bairro Teste 1',
    state: 'Ba',
    city: 'Cidade 1',
    created_at: new Date(),
    updated_at: new Date(),
    user_id:1
};

describe('Delete Client by ID Tests', () => {
    it('Should return null if client is deleted', async () => {

        prismaMock.client.delete.mockResolvedValue(clientMock);

        const result = await DeleteClientByIdUseCase(1, 1);

        expect(result).toBeUndefined();

        expect(prismaMock.client.delete).toHaveBeenCalledWith({
            where: {
                user_id: 1,
                id: 1,
            },
        });
    });

    it('Should handle deletion failure and return an error', async () => {
        prismaMock.client.delete.mockImplementation();

        const result = await DeleteClientByIdUseCase(1, 1);

        expect(result).toBeInstanceOf(Error);

        expect(prismaMock.client.delete).toHaveBeenCalledWith({
            where: {
                user_id: 1,
                id: 1,
            },
        });
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await DeleteClientByIdUseCase(1, 1);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



