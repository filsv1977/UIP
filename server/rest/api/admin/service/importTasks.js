import {DB} from '../../../../index.js';
import hasStructureChecked from '../../../../utils/hasStructureChecked.js';

export default async (req, res) => {
    const tasks = req.body;

    if (hasStructureChecked(tasks)) {
        return res.json(await DB.insertAll(tasks));
    }

    return res.json({success: false, message: 'The input file has a wrong structure'});
};
