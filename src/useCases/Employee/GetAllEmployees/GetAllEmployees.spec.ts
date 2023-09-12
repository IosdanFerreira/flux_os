import { prismaMock } from '../../../tests/PrismaMockProvider';
import { getAllEmployeesUseCase } from './GetAllEmployeesUseCase';
import { IEmployee } from '../../../entities/Employee';

interface IEmployeeMock extends IEmployee{
    user_id: number,
    created_at: Date,
    updated_at: Date,
}

const allEmployeesMock: IEmployeeMock[] = [
    {
        id: 1,
        name: 'Funcionário 1',
        surname: 'Silva 1',
        email: 'teste@gmail.com',
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
    },
    {
        id: 2,
        name: 'Funcionário 2',
        surname: 'Silva 2',
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
    },
];

describe('Get all Employees Tests', () => {
    it('Should return all employees data', async () => {

        prismaMock.employee.findMany.mockResolvedValue(allEmployeesMock);

        const foundAllUsers = await getAllEmployeesUseCase(1, '', 10, 1);

        expect(foundAllUsers).toBeDefined();

        expect(foundAllUsers).toEqual(allEmployeesMock);
    });

    it('Should return empty array for non-existent user_id', async () => {

        prismaMock.employee.findMany.mockResolvedValue([]);

        const notFoundClientsByUserId = await getAllEmployeesUseCase(1, '', 10, 999);

        expect(notFoundClientsByUserId).toEqual([]);
    });

    it('Should return Erro if throw any error', async () => {

        prismaMock.employee.findMany.mockImplementation();

        const resultError = await getAllEmployeesUseCase(1, '', 10, 999);

        expect(resultError).toEqual(new Error('Erro ao consultar todos os funcionários'));
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await getAllEmployeesUseCase(1, '', 10, 1);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });

});



