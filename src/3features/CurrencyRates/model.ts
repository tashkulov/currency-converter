import { ref, computed, watch } from 'vue';
import { fetchCurrencyRates } from '../../4shared/api/currencyApi';

const rates = ref<Record<string, number>>({});
const baseCurrency = ref('USD');

async function updateRates() {
    try {
        const conversionRates = await fetchCurrencyRates(baseCurrency.value);
        console.log('Загруженные курсы:', conversionRates);

        if (conversionRates && typeof conversionRates === 'object') {
            rates.value = conversionRates;
        } else {
            console.error('Неправильный формат ответа от API:', conversionRates);
            rates.value = {};
        }
    } catch (error) {
        console.error('Ошибка при получении курсов валют:', error);
        rates.value = {};
    }
}

function setBaseCurrency(currency: string) {
    baseCurrency.value = currency;
    updateRates();
}

watch(baseCurrency, updateRates);

const filteredRates = computed(() => {
    const ratesObj = rates.value;
    const base = baseCurrency.value;
    const result: Record<string, number> = {};

    for (const [key, rate] of Object.entries(ratesObj)) {
        if (key !== base) {
            result[key] = rate;
        }
    }

    return result;
});

export function useCurrencyRates() {
    return {
        rates,
        baseCurrency,
        setBaseCurrency,
        updateRates,
        filteredRates,
    };
}
