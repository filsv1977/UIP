import React, {useContext, useEffect, useReducer} from 'react';
import {actionTypes} from './actionTypes';
import {fetchData} from '../api/fetchData';

export const initialState = {
    tasks: [],
    isAdmin: false,
    isLoading: false,
    error: '',
    activeFilterBtn: 0,
    currentExchange: {rate: 0, ubx2usdt: 0},
    showLogin: false,
    signedIn: false
};

export const ContextApp = React.createContext();

export const TasksContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    useEffect(() => {
        const intervalId = setInterval(() => fetchData(dispatch, state.activeFilterBtn, false, state.isAdmin), 300000);

        return () => clearInterval(intervalId);
    }, [state]);

    return <ContextApp.Provider value={{state, dispatch}}>{children}</ContextApp.Provider>;
};

export const taskReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.GET_TASKS.PENDING:
            return {
                ...state,
                isLoading: action.noSetLoading
            };
        case actionTypes.GET_TASKS.FULFILLED: {
            return {
                ...state,
                tasks: action.payload.data,
                activeFilterBtn: action.payload.activeFilterBtn,
                isLoading: false,
                error: false
            };
        }
        case actionTypes.GET_TASKS.REJECTED: {
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
        case actionTypes.GET_EXCHANGE_RATE.FULFILLED: {
            return {
                ...state,
                currentExchange: action.payload,
                isLoading: false,
                error: false
            };
        }
        case actionTypes.GET_EXCHANGE_RATE.REJECTED: {
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        }

        case actionTypes.EDIT_TASK.FULFILLED: {
            const {
                id,
                performer: {nickname}
            } = action.payload;
            const {activeFilterBtn, tasks} = state;

            let newData =
                (activeFilterBtn === 0 && nickname) || (activeFilterBtn === 1 && !nickname)
                    ? tasks.filter(task => +task.id !== +id)
                    : tasks.map(task => (+task.id === +id ? action.payload : task));

            return {
                ...state,
                tasks: newData,
                error: false
            };
        }
        case actionTypes.EDIT_TASK.REJECTED: {
            return {
                ...state,
                error: action.payload
            };
        }

        case actionTypes.LOGIN_ADMIN.FULFILLED: {
            return {
                ...state,
                isAdmin: true,
                error: false
            };
        }
        case actionTypes.LOGIN_ADMIN.REJECTED: {
            return {
                ...state,
                error: action.payload,
                isAdmin: false
            };
        }

        case actionTypes.LOGOUT_ADMIN.FULFILLED: {
            return {
                ...state,
                isAdmin: false,
                error: false
            };
        }

        case actionTypes.LOGOUT_ADMIN.REJECTED: {
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

        case actionTypes.SET_VISIBLE: {
            return {
                ...state,
                showLogin: action.payload
            };
        }

        case actionTypes.TOKEN_ERROR: {
            return {
                ...state,
                error: action.payload
            };
        }

        case actionTypes.EXPORT_DB.REJECTED: {
            return {
                ...state,
                error: action.payload
            };
        }

        default:
            return state;
    }
};

export const useTasks = () => {
    return useContext(ContextApp);
};
