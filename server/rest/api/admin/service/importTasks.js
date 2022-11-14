import DbEngine from '../../../../db/dbEngine.js';
import hasStructureChecked from '../../../../utils/hasStructureChecked.js';

export default async (req, res) => {
    const tasks = req.body;
    const db = new DbEngine(process.env.DB_FILE_NAME);

    if (hasStructureChecked(tasks)) {
        return res.json(await db.insertAll(tasks));
    }

    return res.json({success: false, message: 'The input file has a wrong structure'});
};
