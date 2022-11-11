import {pick} from 'ramda';
import {DB} from '../../../../index.js';

export default async (req, res) => {
    let {body, params} = req;

    if (params.id !== undefined) {
        const fields = ['estimationHours', 'ubxPrice', 'usdtPrice'];
        const performerFields = ['nickname', 'walletAddress', 'hasImplementedByUbixTeam'];

        const task = pick(fields, body);
        const performer = pick(performerFields, body.performer);

        const result = await DB.update(+params.id, {...task, performer});
        return res.json(result);
    }

    return res.json({success: false, message: 'Task ID is not specified'});
};
