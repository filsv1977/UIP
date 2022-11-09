import {isAdmin} from '../../../../strategies/autentification.js';

export default (req, res) => {
    const {login, password} = req.body;
    return res.json({success: isAdmin(login, password)});
};
