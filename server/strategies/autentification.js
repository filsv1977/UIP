export function isAdminAuth(req, res, next) {
    try {
        const authheader = req.headers.authorization;
        if (authheader) {
            const {login, password} = JSON.parse(authheader);

            if (isAdmin(login, password)) {
                return next();
            }
        }
        res.json({success: false, message: 'You are not authenticated!'});
    } catch {
        res.json({success: false, message: 'Authentication error!'});
    }
}

export const isAdmin = (login, password) => {
    return login === process.env.LOGIN && password === process.env.PASSWORD;
};
