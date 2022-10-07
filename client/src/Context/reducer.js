import React, {useContext, useEffect, useReducer} from 'react';
import {actionTypes} from './actionTypes';
import {fetchData} from '../api/fetchData';

export const initialState = {
    tasks: [],
    isAdmin: false,
    isLoading: false,
    error: '',
    activeFilterBtn: 0,
    currentExchange: {rate: 0, ubx2usdt: 0}
};

export const ContextApp = React.createContext();

export const TasksContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    useEffect(() => {
        const intervalId = setInterval(() => fetchData(dispatch, state.activeFilterBtn, false), 300000);

        return () => clearInterval(intervalId);
    }, [state]);

    return <ContextApp.Provider value={{state, dispatch}}>{children}</ContextApp.Provider>;
};

export const taskReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.GET_TASKS:
            return {
                ...state,
                isLoading: action.noSetLoading
            };
        case actionTypes.GET_TASKS_SUCCESS: {
            return {
                ...state,
                tasks: action.payload.data,
                activeFilterBtn: action.payload.activeFilterBtn,
                isLoading: false,
                error: false
            };
        }
        case actionTypes.GET_TASKS_FAILED: {
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        }
        case actionTypes.GET_EXCHANGE_RATE:
            return {
                ...state,
                isLoading: action.noSetLoading
            };
        case actionTypes.GET_EXCHANGE_RATE_SUCCESS: {
            return {
                ...state,
                currentExchange: action.payload,
                isLoading: false,
                error: false
            };
        }
        case actionTypes.GET_EXCHANGE_RATE_FAILED: {
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        }

        case actionTypes.EDIT_TASK_SUCCESS: {
            const {
                id,
                performer: {nickname}
            } = action.payload;
            const {activeFilterBtn, tasks} = state;

            let newData =
                !activeFilterBtn && nickname
                    ? tasks.filter(task => +task.id !== +id)
                    : tasks.map(task => (+task.id === +id ? action.payload : task));

            return {
                ...state,
                tasks: newData,
                error: false
            };
        }
        case actionTypes.EDIT_TASK_FAILED: {
            return {
                ...state,
                error: action.payload
            };
        }

        case actionTypes.LOGIN_ADMIN_SUCCESS: {
            return {
                ...state,
                isAdmin: true,
                error: false
            };
        }
        case actionTypes.LOGIN_ADMIN_FAILED: {
            return {
                ...state,
                error: action.payload,
                isAdmin: false
            };
        }

        case actionTypes.LOGOUT_ADMIN: {
            return {
                ...state,
                isAdmin: false,
                error: false
            };
        }

        case actionTypes.LOGOUT_ADMIN_FAILED: {
            return {
                ...state,
                isAdmin: false,
                error: action.payload
            };
        }

        case actionTypes.SET_COST_VALUES: {
            const {
                id,
                data: {rate, ubx2usdt}
            } = action.payload;
            let newData = (state.tasks || []).map(task =>
                task.id === id ? {...task, ubxPrice: rate, usdtPrice: ubx2usdt} : task
            );
            return {
                ...state,
                tasks: newData
            };
        }

        default:
            return state;
    }
};

export const useTasks = () => {
    return useContext(ContextApp);
};
