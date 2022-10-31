import {getList} from '../../../../helpers/getList.js';

const list = (req, res) => {
    const {implemented} = req.query;
    res.json(getList(implemented, true));
};

export default list;
