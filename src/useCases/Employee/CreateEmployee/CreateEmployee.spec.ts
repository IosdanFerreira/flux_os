import { prismaMock } from '../../../tests/PrismaMockProvider';
import { IClient } from '../../../entities/Client';
import { IEmployee } from '../../../entities/Employee';
import { createEmployeeUseCase } from './CreateEmployeeUseCase';

interface IEmployeeMock extends IEmployee{
    user_id: number,
    created_at: Date,
    updated_at: Date,
}

const newEmployee: IEmployeeMock = {
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

describe('Create Employee Tests', () => {
    it('Should create a new employee and return your id', async () => {

        prismaMock.employee.create.mockResolvedValue(newEmployee);

        await expect(createEmployeeUseCase(newEmployee)).resolves.toEqual(2);
    });

    it('Should return Error if throw any error', async () => {

        prismaMock.employee.create.mockImplementation();

        await expect(createEmployeeUseCase(newEmployee)).resolves.toEqual(
            new Error('Erro ao cadastrar o funcionário')
        );
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await createEmployeeUseCase(newEmployee);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



