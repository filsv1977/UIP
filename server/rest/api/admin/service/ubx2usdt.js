import {exchangeUbx} from '../../../../index.js';

export default async (req, res) => {
    const ubx2usdt = await exchangeUbx.ubx2usdt;
    let result;
    if (ubx2usdt === null) {
        result = {success: false, message: exchangeUbx.error};
    } else {
        result = {success: true, data: {rate: process.env.HOURLY_RATE, ubx2usdt}};
    }
    return res.json(result);
};
