import { prismaMock } from '../../../tests/PrismaMockProvider';
import { getAllPaymentSituationsUseCase } from './GetAllPaymentSituationsUseCase';
import { IPaymentForm } from '../../../entities/PaymentForm';
import { IPaymentSituation } from '../../../entities/PaymentSituation';

const allPaymentSituationsMock: IPaymentSituation[] = [
    {
        'id': 1,
        'name': 'Pago'
    },
    {
        'id': 2,
        'name': 'Aguardando Pagamento'
    },
    {
        'id': 3,
        'name': 'Orçamento'
    },
    {
        'id': 4,
        'name': 'Cancelado'
    }
];

describe('Get all Payment Situations Tests', () => {
    it('Should return all payment situations data', async () => {

        prismaMock.paymentSituation.findMany.mockResolvedValue(allPaymentSituationsMock);

        const foundAllUsers = await getAllPaymentSituationsUseCase(1, '', 10);

        expect(foundAllUsers).toBeDefined();

        expect(foundAllUsers).toEqual(allPaymentSituationsMock);
    });

    it('Should return Erro if throw any error', async () => {

        prismaMock.paymentSituation.findMany.mockImplementation();

        const resultError = await getAllPaymentSituationsUseCase(1, '', 10);

        expect(resultError).toEqual(new Error('Erro ao consultar as situações de pagamento'));
    });

    it('should call prismaClient.$disconnect in the end', async () => {
    
        await getAllPaymentSituationsUseCase(1, '', 10);
    
        expect(prismaMock.$disconnect).toHaveBeenCalled();
    });

});



