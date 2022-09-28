import {DB} from '../../../../index.js';
import {TABLES} from '../../../../db/consts.js';

const deleteTask = async (req, res) => {
    let {params} = req;
    let result = false;
    if (params.id !== undefined) {
        result = DB.delete(TABLES.TASKS, params.id);
    }
    return res.json({success: result});
};

export default deleteTask;
