import { prismaMock } from '../../../tests/PrismaMockProvider';
import { deleteEmployeeByIdUseCase } from './DeleteEmployeeByIdUseCase';
import { IEmployee } from '../../../entities/Employee';

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

describe('Delete Employee by ID Tests', () => {
    it('Should return null if employee is deleted', async () => {

        prismaMock.employee.delete.mockResolvedValue(employeeMock);

        const result = await deleteEmployeeByIdUseCase(1, 1);

        expect(result).toBeUndefined();

        expect(prismaMock.employee.delete).toHaveBeenCalledWith({
            where: {
                user_id: 1,
                id: 1,
            },
        });
    });

    it('Should handle deletion failure and return an error', async () => {
        prismaMock.employee.delete.mockImplementation();

        const result = await deleteEmployeeByIdUseCase(1, 1);

        expect(result).toBeInstanceOf(Error);

        expect(prismaMock.employee.delete).toHaveBeenCalledWith({
            where: {
                user_id: 1,
                id: 1,
            },
        });
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await deleteEmployeeByIdUseCase(1, 1);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



