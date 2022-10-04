import md5 from 'md5';
import {LOGIN, PASSWORD} from '../../../../index.js';

const logon = async (req, res) => {
    const {login, password} = req.body;
    const result = login === LOGIN && md5(password) === PASSWORD;
    return res.json({success: result});
};

export default logon;
