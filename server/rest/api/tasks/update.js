import {DB} from '../../../index.js';

const updateTask = async (req, res) => {
    let {body, params} = req;
    let result = false;
    if (params.id !== undefined) {
        result = DB.update(params.id, body);
    }
    return res.json({success: result});
};

export default updateTask;
