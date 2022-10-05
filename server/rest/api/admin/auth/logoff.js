import {setAdmin} from '../../../../strategies/isAdmin.js';

const logoff = async (req, res) => {
    const result = true;
    setAdmin(false);
    return res.json({success: result});
};

export default logoff;
