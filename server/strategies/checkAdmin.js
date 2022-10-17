export const isAdmin = (login, password) => {
    return login === process.env.LOGIN && password === process.env.PASSWORD;
};
