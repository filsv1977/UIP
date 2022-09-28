import {DB} from '../../../../index.js';
import {TABLES} from '../../../../db/consts.js';

const listTask = async (req, res) => {
    let {closed} = req.query;
    let tasks = DB.select(TABLES.TASKS);

    let result = tasks.filter(item => (+closed ? item.performer.nickname !== '' : item.performer.nickname === ''));

    let response = {success: false};
    if (result !== false) {
        response.success = true;
        response.data = result;
    }

    return res.json(response);
};

export default listTask;
