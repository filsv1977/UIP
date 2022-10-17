export function isAdminAuth(req, res, next) {
    if (isAdminByHeader(req)) {
        return next();
    }
    res.json({success: false, message: 'You are not authenticated!'});
}

export const isAdminByHeader = req => {
    const authheader = req.headers.authorization;
    if (authheader) {
        const {login, password} = JSON.parse(authheader);

        return isAdmin(login, password);
    }
};

export const isAdmin = (login, password) => {
    return login === process.env.LOGIN && password === process.env.PASSWORD;
};
