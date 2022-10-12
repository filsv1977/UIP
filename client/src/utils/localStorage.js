import {hexDecode, hexEncode} from './convertHex';

export const addAuthorizationKey = (login, password) => {
    localStorage.setItem('login', login);
    localStorage.setItem('password', hexEncode(password));
};

export const getAuthorizationKey = () => {
    let token;
    const login = localStorage.getItem('login');
    const password = hexDecode(localStorage.getItem('password'));
    if (login && password) {
        token = {login, password};
    }
    return token;
};

export const delAuthorizationKey = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
};
