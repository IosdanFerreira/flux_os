import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetAllPaymentOptionsRequestDTO } from './GetAllPaymentOptionsDTO';


export const getAllPaymentOptionsUseCase = async (page: number, filter: string, limit: number): Promise<IGetAllPaymentOptionsRequestDTO[] | Error> => {
    try {

        const allPaymentOptions = await prismaClient.paymentForm.findMany({
            where: {
                OR: [
                    {name: {contains: filter}},
                ]
            },
            skip: (page - 1) * limit,
            take: limit
        });

        if(allPaymentOptions) return allPaymentOptions;
        
        return new Error('Erro ao consultar as opções de pagamento');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar as opções de pagamento');
    } finally {
        prismaClient.$disconnect();
    }
};