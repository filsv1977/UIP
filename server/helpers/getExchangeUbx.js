import axios from 'axios';

const URL = 'https://exchange.ubix.network/api/v1/tickers/UBX-USDT';

export let ubx2usdt = 0;

export const getExchangeUbx = async () => {
    try {
        const res = await axios.get(URL);
        ubx2usdt = res.data.price;
    } catch (error) {
        console.error(error);
    }
};
