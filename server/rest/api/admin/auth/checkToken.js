import {isAdminByHeader} from '../../../../strategies/isAdminByHeader.js';

const checkToken = (req, res) => {
    return res.json({success: isAdminByHeader(req.headers.authorization)});
};

export default checkToken;
