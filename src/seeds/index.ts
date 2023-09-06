import { seedPaymentOptions } from './SeedPaymentOptions';
import { seedPaymentSituations } from './SeedPaymentSituation';

async function seedData() {
    try {
        await Promise.all([seedPaymentSituations(), seedPaymentOptions()]);
    } catch (error) {
        console.error('Erro ao semear os dados:', error);
    }
}

seedData();
