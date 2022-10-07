import {DB} from '../../../../index.js';
import {ubx2usdt} from '../../../../helpers/getExchangeUbx.js';
import {HOURLY_RATE} from '../../../../utils/globalVariables.js';

const patchTask = async (req, res) => {
    let {body, params} = req;

    let result = false;
    if (params.id !== undefined) {
        body.ubxPrice = body.estimationHours * HOURLY_RATE;
        body.usdtPrice = (body.ubxPrice * ubx2usdt).toFixed(2);
        result = DB.update(+params.id, body);
    }

    return res.json(result);
};

export default patchTask;
