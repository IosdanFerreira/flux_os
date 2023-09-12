import { prismaMock } from '../../../tests/PrismaMockProvider';
import { IClient } from '../../../entities/Client';
import { IEmployee } from '../../../entities/Employee';
import { updateEmployeeByIdUseCase } from './UpdateEmployeeByIdUseCase';

interface IEmployeeMock extends IEmployee{
    user_id: number,
    created_at: Date,
    updated_at: Date,
}

const employeeMock: IEmployeeMock = {
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
};

const updatedEmployee: IEmployeeMock = {
    id: 2,
    name: 'Funcionário 2',
    surname: 'Silva ',
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

describe('Update employee by ID Tests', () => {
    it('Should return null if client is updated', async () => {

        prismaMock.employee.count.mockResolvedValue(1);
        prismaMock.employee.update.mockResolvedValue(updatedEmployee);

        const updateEmployee = await updateEmployeeByIdUseCase(employeeMock.user_id, employeeMock.id, updatedEmployee);

        expect(updateEmployee).toBeUndefined();

        expect(prismaMock.employee.update).toHaveBeenCalledWith({
            where: {
                user_id: employeeMock.user_id,
                id: employeeMock.id,
            },
            data:{
                ...updatedEmployee
            }
        });
    });

    it('Should handle non-existent client and return an error', async () => {

        prismaMock.employee.count.mockResolvedValue(0);

        const result = await updateEmployeeByIdUseCase(employeeMock.user_id, employeeMock.id, updatedEmployee);

        expect(result).toBeInstanceOf(Error);
        expect(result).toEqual(new Error('Nenhum funcionário foi encontrado'));

        expect(prismaMock.employee.update).not.toHaveBeenCalled();
    });
    it('Should return Erro if throw any error', async () => {

        prismaMock.employee.count.mockResolvedValue(1);
        prismaMock.employee.update.mockRejectedValue(new Error('Erro ao atualizar registro'));

        const result = await updateEmployeeByIdUseCase(employeeMock.user_id, employeeMock.id, updatedEmployee);

        expect(result).toBeInstanceOf(Error);
        expect(result).toEqual(new Error('Erro ao atualizar registro'));

        expect(prismaMock.employee.update).toHaveBeenCalledWith({
            where: {
                user_id: employeeMock.user_id,
                id: employeeMock.id,
            },
            data:{
                ...updatedEmployee
            }
        });
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await updateEmployeeByIdUseCase(employeeMock.user_id, employeeMock.id, updatedEmployee);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



