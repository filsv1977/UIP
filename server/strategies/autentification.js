export function isAdminAuth(req, res, next) {
    const authheader = req.headers.authorization;
    const auth = JSON.parse(authheader);

    if (!!authheader && auth.login === process.env.LOGIN && auth.password === process.env.PASSWORD) {
        next();
    } else {
        res.json({success: false, message: 'You are not authenticated!'});
    }
}
