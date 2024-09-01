import { defineStore } from 'pinia';
import { fetchCurrencyRates } from '../../4shared/api/currencyApi';

export const useCurrencyRates = defineStore('currencyRates', {
    state: () => ({
        rates: {},
        baseCurrency: 'USD',
    }),
    actions: {
        async loadRates() {
            try {
                this.rates = await fetchCurrencyRates();
            } catch (error) {
                console.error('Failed to fetch rates', error);
            }
        },
        setBaseCurrency(currency: string) {
            this.baseCurrency = currency;
        },
    },
});
