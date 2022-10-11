import md5 from 'md5';
import {setAdmin} from '../../../../strategies/isAdmin.js';

const logon = async (req, res) => {
    const {login, password} = req.body;
    const result = login === process.env.LOGIN && md5(password) === process.env.PASSWORD;
    setAdmin(result);
    return res.json({success: result});
};

export default logon;
