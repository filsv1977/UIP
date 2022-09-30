import request from 'request';

const URL = 'https://exchange.ubix.network/api/v1/tickers/UBX-USDT';

export const convertUbx2Usdt = ubx => {
    request(URL, function (error, res, body) {
        if (error) {
            console.error(error);
            return;
        }

        let cost = 0;
        try {
            const {price} = JSON.parse(body);
            cost = ubx * price;
        } catch (e) {
            console.log(e);
        }

        return cost;
    });
};
