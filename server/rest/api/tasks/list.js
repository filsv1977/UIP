import {getList} from '../../../helpers/getList.js';

const list = async (req, res) => {
    let {implemented} = req.query;
    res.json(getList(implemented, false));
};

export default list;
