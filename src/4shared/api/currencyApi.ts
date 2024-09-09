import {$api} from "../../api.ts";


const apiKey = '599ffc949e505dbc6e3d2887';

export async function fetchCurrencyRates(base: string) {
    try {
        const response = await $api.get(`/${apiKey}/latest/${base}`);
        return response.data.conversion_rates;
    } catch (error) {
        console.error('Ошибка при получении курсов валют:', error);
        throw error;
    }
}
