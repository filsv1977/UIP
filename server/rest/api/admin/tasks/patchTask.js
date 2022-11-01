import * as R from 'ramda';
import {DB} from '../../../../index.js';

const patchTask = async (req, res) => {
    let {body, params} = req;

    if (params.id !== undefined) {
        const fields = ['estimationHours', 'ubxPrice', 'usdtPrice'];
        const performerFields = ['nickname', 'walletAddress', 'hasImplementedByUbixTeam'];

        let task = R.pick(fields, body);
        let performer = R.pick(performerFields, body.performer);

        const result = await DB.update(+params.id, {...task, performer});
        return res.json(result);
    }

    return res.json({success: false, message: 'Task ID is not specified'});
};

export default patchTask;
