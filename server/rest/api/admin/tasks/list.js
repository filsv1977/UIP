import {DB} from '../../../../index.js';

const list = async (req, res) => {
    let {implemented} = req.query;

    try {
        const answer = DB.select();

        let isImplemented = item => {
            return implemented === undefined || item.performer.nickname !== '' || item.implemented;
        };

        const data = [];

        answer.data.forEach(item => {
            if (+implemented ? isImplemented(item) : !isImplemented(item)) {
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
