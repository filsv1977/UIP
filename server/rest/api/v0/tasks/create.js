import {DB} from '../../../../index.js';
import {TABLES} from '../../../../db/consts.js';

const createTask = async (req, res) => {
    const result = DB.insert(TABLES.TASKS, req.body);
    return res.json({success: result});
};

export default createTask;
