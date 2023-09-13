import { prismaClient } from '../shared/services/PrismaClient';


export const seedPaymentOptions = async () => {
    const paymentOptions = [
        {id: 1, name: 'Cartão de Crédito'},
        {id: 2, name: 'Cartão de Débito'},
        {id: 3, name: 'Dinheiro'},
        {id: 4, name: 'PIX'},
        {id: 5, name: 'Boleto'},
    ]; 

    paymentOptions.map(async (paymentOption) => {

        const paymentOptionsCount = await prismaClient.paymentForm.count({
            where:{
                id: paymentOption.id
            }
        });

        if(paymentOptionsCount === 0) {
            await prismaClient.paymentForm.create({
                data:{
                    ...paymentOption
                }
            });
        }

    });
};