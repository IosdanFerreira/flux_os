import { prismaMock } from '../../../tests/PrismaMockProvider';
import { IClient } from '../../../entities/Client';
import { updateClientByIdUseCase } from './UpdateClientByIdUseCase';

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

const updatedClient: IClientMock = {
    id: 1,
    name: 'Cliente Atualizado',
    surname: 'Silva Atualizado',
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

describe('Update Client by ID Tests', () => {
    it('Should return null if client is updated', async () => {

        prismaMock.client.count.mockResolvedValue(1);
        prismaMock.client.update.mockResolvedValue(updatedClient);

        const updateClient = await updateClientByIdUseCase(clientMock.user_id, clientMock.id, updatedClient);

        expect(updateClient).toBeUndefined();

        expect(prismaMock.client.update).toHaveBeenCalledWith({
            where: {
                user_id: clientMock.user_id,
                id: clientMock.id,
            },
            data:{
                ...updatedClient
            }
        });
    });

    it('Should handle non-existent client and return an error', async () => {

        prismaMock.client.count.mockResolvedValue(0);

        const result = await updateClientByIdUseCase(clientMock.user_id, clientMock.id, updatedClient);

        expect(result).toBeInstanceOf(Error);
        expect(result).toEqual(new Error('Nenhum cliente foi encontrado'));

        expect(prismaMock.client.update).not.toHaveBeenCalled();
    });
    it('Should return Erro if throw any error', async () => {

        prismaMock.client.count.mockResolvedValue(1);
        prismaMock.client.update.mockRejectedValue(new Error('Erro ao atualizar registro'));

        const result = await updateClientByIdUseCase(clientMock.user_id, clientMock.id, updatedClient);

        expect(result).toBeInstanceOf(Error);
        expect(result).toEqual(new Error('Erro ao atualizar registro'));

        expect(prismaMock.client.update).toHaveBeenCalledWith({
            where: {
                user_id: clientMock.user_id,
                id: clientMock.id,
            },
            data:{
                ...updatedClient
            }
        });
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await updateClientByIdUseCase(clientMock.user_id, clientMock.id, updatedClient);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



