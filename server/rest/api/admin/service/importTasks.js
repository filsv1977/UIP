import {DB} from "../../../../index.js";

const importTasks = async (req, res) => {
    res.json({success: true, data: DB.select()});
};

export default importTasks;
