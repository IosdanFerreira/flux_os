import { createUser, checkUserExistence } from './CreateUserUseCase';
import { prismaMock } from '../../../tests/PrismaMockProvider';
import { User } from '../../../entities/User';

interface IUserMock extends User{
    created_at: Date,
    updated_at: Date,
}

describe('Create User', () => {
    it('Shoud create a new user successfully', async () => {
        const newUser: IUserMock = {
            id: 1,
            name: 'Rich',
            surname: 'John',
            email: 'hello@prisma.io',
            password: 'teste.prisma123',
            created_at: new Date(),
            updated_at: new Date(),
        };
      
        prismaMock.user.create.mockResolvedValue(newUser);
      
        await expect(createUser(newUser)).resolves.toEqual(1);
    });
    
    it('Should not allow duplicate emails', async () => {
        const existingUser = {
            id: 2,
            name: 'John',
            surname: 'Doe',
            email: 'hello@prisma.io',
            password: 'existingUser123',
            created_at: new Date(),
            updated_at: new Date(),
        };
    
        prismaMock.user.findFirst.mockResolvedValue(existingUser);
    
        const newUserWithDuplicateEmail = {
            id: 3,
            name: 'Jane',
            surname: 'Smith',
            email: 'hello@prisma.io', // Email already exists
            password: 'newUser123',
            created_at: new Date(),
            updated_at: new Date(),
        };
    
        await expect(createUser(newUserWithDuplicateEmail)).resolves.toEqual(
            new Error('Já existe um usuário cadastrado com esse endereço de email')
        );
    });
});



