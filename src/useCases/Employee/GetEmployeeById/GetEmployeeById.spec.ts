import { prismaMock } from '../../../tests/PrismaMockProvider';
import { IClient } from '../../../entities/Client';
import { IEmployee } from '../../../entities/Employee';
import { getEmployeeByIdUseCase } from './GetEmployeeByIdUseCase';

interface IEmployeeMock extends IEmployee{
    user_id: number,
    created_at: Date,
    updated_at: Date,
}

const employeeMock: IEmployeeMock = {
    id: 2,
    name: 'Cliente 2 Atualizado',
    surname: 'Silva 2 Atualizado',
    email: 'teste_2@gmail.com',
    phone: null,
    commission: 1500,
    cpf: '846.484.545-44',
    rg: null,
    gender: '84.484.445-44',
    cep: '48.609-050',
    street: 'R. Teste 1',
    number_house: '504',
    neighborhood: 'Bairro Teste 1',
    state: 'Ba',
    city: 'Cidade 1',
    comments: 'Comentário teste',
    created_at: new Date(),
    updated_at: new Date(),
    user_id:1
};

describe('Get Employee by ID Tests', () => {
    it('Should return clients by ID', async () => {

        prismaMock.employee.findUnique.mockResolvedValue(employeeMock);

        const foundUser = await getEmployeeByIdUseCase(1, 1);

        expect(foundUser).toBeDefined();

        expect(foundUser).toEqual(employeeMock);

    });

    it('Should return an error for non-existent employee ID', async () => {
        // Configure o PrismaMock para retornar null, indicando que o cliente não existe
        prismaMock.employee.findUnique.mockResolvedValue(null);
    
        const notFoundUser = await getEmployeeByIdUseCase(1, 123); // ID de cliente que não existe
    
        expect(notFoundUser).toBeInstanceOf(Error);
        expect(notFoundUser).toEqual(new Error('Nenhum registro encontrado!'));
    });
    it('Should return an error for non-existent user ID', async () => {
        // Configure o PrismaMock para retornar null, indicando que o cliente não existe
        prismaMock.employee.findUnique.mockResolvedValue(null);
    
        const notFoundUser = await getEmployeeByIdUseCase(16546, 123); // ID de cliente que não existe
    
        expect(notFoundUser).toBeInstanceOf(Error);
        expect(notFoundUser).toEqual(new Error('Nenhum registro encontrado!'));
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await getEmployeeByIdUseCase(1, 1);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



