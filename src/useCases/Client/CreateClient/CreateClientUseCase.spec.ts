import { prismaMock } from '../../../tests/PrismaMockProvider';
import { IClient } from '../../../entities/Client';
import { createClientUseCase } from './CreateClientUseCase';

interface IClientMock extends IClient{
    user_id: number,
    created_at: Date,
    updated_at: Date,
}

const newClient: IClientMock = {
    id: 2,
    name: 'Cliente 2 Atualizado',
    surname: 'Silva 2 Atualizado',
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
};

describe('Create Client Tests', () => {
    it('Should create a new client and return your id', async () => {

        prismaMock.client.create.mockResolvedValue(newClient);

        await expect(createClientUseCase(newClient)).resolves.toEqual(2);
    });

    it('Should return Error if throw any error', async () => {

        prismaMock.client.create.mockImplementation();

        await expect(createClientUseCase(newClient)).resolves.toEqual(
            new Error('Erro ao cadastrar cliente')
        );
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await createClientUseCase(newClient);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



