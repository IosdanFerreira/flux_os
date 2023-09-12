import { prismaMock } from '../../../tests/PrismaMockProvider';
import { User } from '../../../entities/User';
import { findByEmail } from './FindByEmailUseCase';

interface IUserMock extends User{
    created_at: Date,
    updated_at: Date,
}

describe('Login Tests', () => {
    it('Should find user by email', async () => {
        const existingUser: IUserMock = {
            id: 1,
            name: 'Rich',
            surname: 'John',
            email: 'test.email@gmail.com',
            password: 'teste.prisma123',
            created_at: new Date(),
            updated_at: new Date(),
        };

        prismaMock.user.findUnique.mockResolvedValue(existingUser);

        const foundUser = await findByEmail(existingUser.email);
      
        expect(foundUser).toBeDefined();
        expect(existingUser).toEqual(foundUser);
    });

    it('Should return Error if not found user email', async () => {

        prismaMock.user.findUnique.mockResolvedValue(null);

        const notFoundUser = await findByEmail('test.email@gmail.com');
      
        expect(notFoundUser).toBeInstanceOf(Error);
        expect(notFoundUser).toEqual(
            new Error('Nenhum usuário encontrado com esse endereço de email')
        );
    });

    it('should return the default Error if throw another error', async () => {
        // Simule uma exceção ao consultar o banco de dados
        prismaMock.user.findUnique.mockRejectedValue(new Error('Erro ao consultar registro'));
    
        const resultError = await findByEmail('test@example.com');
    
        expect(resultError).toBeInstanceOf(Error);
        expect(resultError).toBe(
            new Error('Erro ao consultar registro')
        );
    });

    it('should call prismaClient.$disconnect in the end', async () => {
        prismaMock.user.findUnique.mockResolvedValue(null);
    
        await findByEmail('test.email@gmail.com');
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });
});



