import {getList} from '../../../../helpers/getList.js';

const list = async (req, res) => {
    let {implemented} = req.query;
    res.json(getList(implemented, true));
};

export default list;
