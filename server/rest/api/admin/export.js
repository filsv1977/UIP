import {DB} from '../../../index.js';

const exportTasks = async (req, res) => {
    let result = DB.select();
    return res.json({success: result});
};

export default exportTasks;
