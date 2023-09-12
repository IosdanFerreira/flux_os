import { prismaMock } from '../../../tests/PrismaMockProvider';
import { IClient } from '../../../entities/Client';
import { GetAllClientsUseCase } from './GetAllClientsUseCase';

interface IClientMock extends IClient{
    user_id: number,
    created_at: Date,
    updated_at: Date,
}

const allClientsMock: IClientMock[] = [
    {
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
    },
    {
        id: 2,
        name: 'Cliente 2',
        surname: 'Silva 2',
        email: 'teste_2@gmail.com',
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
    },
];

describe('Get all Clients Tests', () => {
    it('Should return all clients data', async () => {

        prismaMock.client.findMany.mockResolvedValue(allClientsMock);

        const foundAllUsers = await GetAllClientsUseCase(1, '', 10, 1);

        expect(foundAllUsers).toBeDefined();

        expect(foundAllUsers).toEqual(allClientsMock);
    });

    it('Should return empty array for non-existent user_id', async () => {

        prismaMock.client.findMany.mockResolvedValue([]);

        const notFoundClientsByUserId = await GetAllClientsUseCase(1, '', 10, 999);

        expect(notFoundClientsByUserId).toEqual([]);
    });

    it('Should return Erro if throw any error', async () => {

        prismaMock.client.findMany.mockImplementation();

        const resultError = await GetAllClientsUseCase(1, '', 10, 999);

        expect(resultError).toEqual(new Error('Erro ao consultar todos os clientes'));
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await GetAllClientsUseCase(1, '', 10, 1);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });

});



