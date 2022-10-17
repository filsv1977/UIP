import {getList} from '../../../helpers/getList.js';
import {isAdminByHeader} from '../../../strategies/autentification.js';

const list = async (req, res) => {
    let {implemented} = req.query;
    res.json(getList(implemented, isAdminByHeader(req)));
};

export default list;
