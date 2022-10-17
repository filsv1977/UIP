export function isAdminAuth(req, res, next) {
    const authheader = req.headers.authorization;
    const auth = JSON.parse(authheader);

    if (!!authheader && auth.login === process.env.LOGIN && auth.password === process.env.PASSWORD) {
        next();
    } else {
        const err = new Error('You are not authenticated!');
        err.status = 401;
        return next(err);
    }
}
