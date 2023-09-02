import { prismaClient } from '../../../shared/services/PrismaClient';


export const getAllPaymentOptionsCount = async (filter:string = ''): Promise<number | Error> => {
    try {

        const allPaymentOptions = await prismaClient.paymentForm.count({
            where:{
                OR:[
                    {name: {contains: filter}},
                ]
            }
        });

        if(Number.isInteger(allPaymentOptions)) return allPaymentOptions;
        
        return new Error('Erro ao consultar a quantidade total de registros');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar a quantidade total de registros');
    } finally {
        await prismaClient.$disconnect();
    }
};