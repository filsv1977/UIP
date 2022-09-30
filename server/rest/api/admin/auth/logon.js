import md5 from 'md5';

const PASSWORD = '21232f297a57a5a743894a0e4a801fc3';
const LOGIN = 'admin';

const logon = async (req, res) => {
    const {login, password} = req.body;
    const result = login === LOGIN && md5(password) === PASSWORD;
    return res.json({success: result});
};

export default logon;
