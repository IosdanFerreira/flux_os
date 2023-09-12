import { prismaMock } from '../../../tests/PrismaMockProvider';
import { getAllPaymentOptionsUseCase } from './GetAllPaymentOptionsUseCase';
import { IPaymentForm } from '../../../entities/PaymentForm';

const allPaymentFormsMock: IPaymentForm[] = [
    {
        id: 1,
        name: 'Cartão de Crédito'
    },
    {
        id: 2,
        name: 'Cartão de Débito'
    },
    {
        id: 3,
        name: 'Dinheiro'
    },
    {
        id: 4,
        name: 'PIX'
    },
    {
        id: 5,
        name: 'Boleto'
    }
];

describe('Get all Payment Options Tests', () => {
    it('Should return all payment options data', async () => {

        prismaMock.paymentForm.findMany.mockResolvedValue(allPaymentFormsMock);

        const foundAllUsers = await getAllPaymentOptionsUseCase(1, '', 10);

        expect(foundAllUsers).toBeDefined();

        expect(foundAllUsers).toEqual(allPaymentFormsMock);
    });

    it('Should return Erro if throw any error', async () => {

        prismaMock.paymentForm.findMany.mockImplementation();

        const resultError = await getAllPaymentOptionsUseCase(1, '', 10);

        expect(resultError).toEqual(new Error('Erro ao consultar as opções de pagamento'));
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await getAllPaymentOptionsUseCase(1, '', 10);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });

});



