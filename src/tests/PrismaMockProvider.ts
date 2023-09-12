import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy, mockReset } from 'jest-mock-extended';

// Importe o objeto PrismaClient diretamente do código da sua aplicação.
import { prismaClient } from '../shared/services/PrismaClient';

const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();

// Faça o mock do módulo PrismaClient para retornar o prismaMock.
jest.mock('../shared/services/PrismaClient', () => ({
    __esModule: true,
    prismaClient: prismaMock,
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export { prismaMock };
