import { prismaClient } from '../shared/services/PrismaClient';


export const seedPaymentSituations = async () => {
    const paymentSituations = [
        {id: 1, name: 'Pago'},
        {id: 2, name: 'Aguardando Pagamento'},
        {id: 3, name: 'Orçamento'},
        {id: 4, name: 'Cancelado'},
    ];

    paymentSituations.map(async (paymentSituation) => {

        const paymentOptionsCount = await prismaClient.paymentForm.count({
            where:{
                id: paymentSituation.id
            }
        });

        if(paymentOptionsCount === 0) {
            await prismaClient.paymentSituation.create({
                data:{
                    ...paymentSituation
                }
            });
        }
    });
};