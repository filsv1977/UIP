import create from '../utils/createPromiseActionType';

export const actionTypes = {
    EDIT_TASK: create('EDIT_TASK'),
    IMPORT_DB: create('IMPORT_DB'),
    EXPORT_DB: create('EXPORT_DB'),
    GET_EXCHANGE_RATE: create('GET_EXCHANGE_RATE'),
    GET_TASKS: create('GET_TASKS'),
    LOGIN_ADMIN: create('LOGIN_ADMIN'),
    LOGOUT_ADMIN: create('LOGOUT_ADMIN'),
    SET_COST_VALUES: 'SET_COST_VALUES',
    SET_VISIBLE: 'SET_VISIBLE',
    SET_ACTIVE_BUTTON: 'SET_ACTIVE_BUTTON',
    CLEAR_TASKS: 'CLEAR_TASKS',
    TOKEN_ERROR: 'TOKEN_ERROR'
};
