import create from '../utils/createPromiseActionType';

export const actionTypes = {
    EDIT_TASK: create('EDIT_TASK'),
    EXPORT_DB: create('EXPORT_DB'),
    GET_EXCHANGE_RATE: create('GET_EXCHANGE_RATE'),
    GET_TASKS: create('GET_TASKS'),
    LOGIN_ADMIN: create('LOGIN_ADMIN'),
    LOGOUT_ADMIN: create('LOGOUT_ADMIN'),
    CHECK_TOKEN: create('CHECK_TOKEN'),
    SET_COST_VALUES: 'SET_COST_VALUES',
    SET_VISIBLE: 'SET_VISIBLE',
    CLOSE_MODAL: 'CLOSE_MODAL'
};
