import {hexDecode, hexEncode} from './convertHex';

export const addAuthorizationKey = (login, password) => {
    localStorage.setItem('login', login);
    localStorage.setItem('password', hexEncode(password));
};

export const getAuthorizationKey = () => {
    return {
        login: localStorage.getItem('login'),
        password: hexDecode(localStorage.getItem('password'))
    };
};

export const delAuthorizationKey = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
};
