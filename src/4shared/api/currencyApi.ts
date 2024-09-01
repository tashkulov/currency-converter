import axios from 'axios';

export async function fetchCurrencyRates() {
    try {
        const response = await axios.get('https://status.neuralgeneration.com/api/currency');
        // Здесь извлекаются курсы валют
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении курсов валют:', error);
        throw error;
    }
}
