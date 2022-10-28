import create from '../utils/createPromiseActionType';

export const actionTypes = {
    EDIT_TASK: create('EDIT_TASK'),
    IMPORT_DB: create('IMPORT_DB'),
    EXPORT_DB: create('EXPORT_DB'),
    GET_EXCHANGE_RATE: create('GET_EXCHANGE_RATE'),
    GET_TASKS: create('GET_TASKS'),
    GET_OPEN_TASKS: create('GET_OPEN_TASKS'),
    GET_IMPLEMENTED_TASKS: create('GET_IMPLEMENTED_TASKS'),
    LOGIN_ADMIN: create('LOGIN_ADMIN'),
    LOGOUT_ADMIN: create('LOGOUT_ADMIN'),
    SET_COST_VALUES: 'SET_COST_VALUES',
    SET_VISIBLE: 'SET_VISIBLE',
    SET_ACTIVE_FILTER_BUTTON: 'SET_ACTIVE_FILTER_BUTTON',
    TOKEN_ERROR: 'TOKEN_ERROR',
    SHOW_ERROR: 'SHOW_ERROR'
};
