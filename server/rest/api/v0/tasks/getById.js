import {DB} from '../../../../index.js';
import {TABLES} from '../../../../db/consts.js';

const getTask = async (req, res) => {
    let {id} = req.params;
    let result = false;
    if (id !== undefined) {
        result = DB.selectById(TABLES.TASKS, id);
    }

    let response = {success: false};

    if (result !== false) {
        response.success = true;
        response.data = result;
    }
    return res.json(response);
};

export default getTask;
