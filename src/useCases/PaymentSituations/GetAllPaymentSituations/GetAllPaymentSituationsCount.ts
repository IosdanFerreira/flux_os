import { prismaClient } from '../../../shared/services/PrismaClient';


export const getAllPaymentSituationsCount = async (filter:string = ''): Promise<number | Error> => {
    try {

        const PaymentSituationsCount = await prismaClient.paymentSituation.count({
            where:{
                OR:[
                    {name: {contains: filter}},
                ]
            }
        });

        if(Number.isInteger(PaymentSituationsCount)) return PaymentSituationsCount;
        
        return new Error('Erro ao consultar a quantidade total de registros');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar a quantidade total de registros');
    } finally {
        await prismaClient.$disconnect();
    }
};