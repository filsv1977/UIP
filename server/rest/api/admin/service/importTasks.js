import {DB} from '../../../../index.js';
import {isCorrectImport} from '../../../../utils/isCorrectImport.js';

export default async (req, res) => {
    const tasks = req.body;

    if (isCorrectImport(tasks)) {
        return res.json(await DB.insertAll(tasks));
    }

    return res.json({success: false, message: 'Import file format is wrong'});
};
