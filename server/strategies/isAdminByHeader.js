export const isAdminByHeader = authHeader => {
    let auth = {};
    try {
        if (!authHeader) return false;

        auth = JSON.parse(authHeader);
    } catch (error) {
        console.log(error);
    }
    return isAdmin(auth.login, auth.password);
};

export const isAdmin = (login, password) => {
    return login === process.env.LOGIN && password === process.env.PASSWORD;
};
