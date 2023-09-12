import { prismaClient } from '../../../shared/services/PrismaClient';
import { IGetAllPaymentSituationsRequestDTO } from './GetAllPaymentSituationsDTO';


export const getAllPaymentSituationsUseCase = async (page: number, filter: string, limit: number): Promise<IGetAllPaymentSituationsRequestDTO[] | Error> => {
    try {

        const allPaymentSituations = await prismaClient.paymentSituation.findMany({
            where: {
                OR: [
                    {name: {contains: filter}},
                ]
            },
            skip: (page - 1) * limit,
            take: limit
        });

        if(allPaymentSituations) return allPaymentSituations;
        
        return new Error('Erro ao consultar as situações de pagamento');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar as situações de pagamento');
    } finally {
        prismaClient.$disconnect();
    }
};