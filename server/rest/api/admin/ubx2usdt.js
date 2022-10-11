import exchangeUbx from '../../../helpers/exchangeUbx.js';

const ubx2usdt = async (req, res) => {
    return res.json({success: true, data: {rate: process.env.HOURLY_RATE, ubx2usdt: exchangeUbx.ubx2usdt}});
};

export default ubx2usdt;
