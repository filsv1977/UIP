import {isAdminByHeader} from '../../../../strategies/checkAdmin.js';

const checkToken = (req, res) => {
    return res.json({success: isAdminByHeader(req.headers.authorization)});
};

export default checkToken;
