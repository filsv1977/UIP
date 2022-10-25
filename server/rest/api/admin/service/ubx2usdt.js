import {exchangeUbx} from '../../../../index.js';

const ubx2usdt = async (req, res) => {
    let ubx2usdt = exchangeUbx.ubx2usdt;
    let result;
    if (ubx2usdt === null) {
        result = {success: false, message: exchangeUbx.error};
    } else {
        result = {success: true, data: {rate: process.env.HOURLY_RATE, ubx2usdt}};
    }
    return res.json(result);
};

export default ubx2usdt;
