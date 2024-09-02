import axios from 'axios';

const apiKey = '599ffc949e505dbc6e3d2887';

export async function fetchCurrencyRates(base: string) {
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`);
        return response.data.conversion_rates;
    } catch (error) {
        console.error('Ошибка при получении курсов валют:', error);
        throw error;
    }
}
