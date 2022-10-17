import {DB} from '../../../index.js';

const list = async (req, res) => {
    let {implemented} = req.query;
    // const authHeader = req.headers.authorization;

    try {
        const answer = DB.select();
        if (!answer.success) {
            res.json({...answer});
            return;
        }

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
                // if (!isAdminAuth(authHeader)) {
                //     delete x.performer.walletAddress;
                //     delete x.performer.hasImplementedByUbixTeam;
                // }
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
