import {pick} from 'ramda';

import DbEngine from '../../../../db/dbEngine.js';

export default async (req, res) => {
    const {body, params} = req;
    const db = new DbEngine(process.env.DB_FILE_NAME);

    if (params.id !== undefined) {
        const fields = ['estimationHours', 'ubxPrice', 'usdtPrice'];
        const performerFields = ['nickname', 'walletAddress', 'hasImplementedByUbixTeam'];

        const task = pick(fields, body);
        const performer = pick(performerFields, body.performer);

        const result = await db.update(+params.id, {...task, performer});
        return res.json(result);
    }

    return res.json({success: false, message: 'Task ID is not specified'});
};
