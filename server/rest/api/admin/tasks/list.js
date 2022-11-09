import {getList} from '../../../../helpers/getList.js';

export default (req, res) => {
    const {implemented} = req.query;
    res.json(getList(implemented, true));
};
