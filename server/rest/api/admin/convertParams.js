import {ubx2usdt} from '../../../helpers/getExchangeUbx.js';
import {HOURLY_RATE} from '../../../utils/globalVariables.js';

const convertParams = async (req, res) => {
    return res.json({success: true, data: {rate: HOURLY_RATE, ubx2usdt}});
};

export default convertParams;
