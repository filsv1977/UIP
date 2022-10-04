import {DB} from '../../../index.js';

const list = async (req, res) => {
    let {closed} = req.query;

    try {
        const answer = DB.select();
        const data = answer.data.filter(item =>
            +closed ? item.performer.nickname !== '' : item.performer.nickname === ''
        );

        res.json({success: answer.success, data});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'DB is broken'});
    }
};

export default list;
