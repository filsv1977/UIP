import {DB} from '../../../../index.js';
import {TABLES} from '../../../../db/consts.js';

const updateTask = async (req, res) => {
    let {body, params} = req;
    let result = false;
    if (params.id !== undefined) {
        result = DB.update(TABLES.TASKS, params.id, body);
    }
    return res.json({success: result});
};

export default updateTask;
