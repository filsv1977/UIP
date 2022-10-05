import {DB} from '../../../index.js';
// import {isAdmin} from "../../../strategies/isAdmin.js";

const list = async (req, res) => {
    let {implemented} = req.query;

    try {
        const answer = DB.select();

        let filter = item => {
            if (implemented === undefined) return true;

            let closed = item.performer.nickname !== '' || item.implemented;
            if (+implemented) return closed;
            return !closed;
        };

        const data = [];

        answer.data.forEach(item => {
            if (filter(item)) {
                let x = JSON.parse(JSON.stringify(item));
                delete x.performer.walletAddress;
                data.push(x);
            }
        });

        res.json({success: answer.success, data});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'DB is broken'});
    }
};

export default list;
