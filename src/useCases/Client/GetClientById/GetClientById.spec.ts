import { prismaMock } from '../../../tests/PrismaMockProvider';
import { IClient } from '../../../entities/Client';
import { getClientByIdUseCase } from './GetClientByIdUseCase';

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

describe('Get Client by ID Tests', () => {
    it('Should return clients by ID', async () => {

        prismaMock.client.findUnique.mockResolvedValue(clientMock);

        const foundUser = await getClientByIdUseCase(1, 1);

        expect(foundUser).toBeDefined();

        expect(foundUser).toEqual(clientMock);

    });

    it('Should return an error for non-existent client ID', async () => {
        prismaMock.client.findUnique.mockResolvedValue(null);
    
        const notFoundUser = await getClientByIdUseCase(1, 123);
    
        expect(notFoundUser).toBeInstanceOf(Error);
        expect(notFoundUser).toEqual(new Error('Nenhum registro encontrado!'));
    });
    it('Should return an error for non-existent user ID', async () => {
        prismaMock.client.findUnique.mockResolvedValue(null);
    
        const notFoundUser = await getClientByIdUseCase(16546, 123);
    
        expect(notFoundUser).toBeInstanceOf(Error);
        expect(notFoundUser).toEqual(new Error('Nenhum registro encontrado!'));
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await getClientByIdUseCase(1, 1);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



