import request from 'request';

const URL = 'https://exchange.ubix.network/api/v1/tickers/UBX-USDT';
export let ubx2usdt = 0;

export const getExchangeUbx = () => {
    request(URL, function (error, res, body) {
        if (error) {
            console.error(error);
            return;
        }

        try {
            const {price} = JSON.parse(body);
            ubx2usdt = price;
        } catch (error) {
            console.error(error);
        }
    });
};
