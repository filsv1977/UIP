import React, {useContext, useEffect, useReducer} from 'react';
import {actionTypes} from './actionTypes';
import {fetchData} from '../api/fetchData';
import {fetchError} from '../constants';

export const initialState = {
    tasks: [],
    isAdmin: false,
    isLoading: false,
    error: '',
    activeFilterBtn: 1,
    currentExchange: {rate: 0, ubx2usdt: 0},
    showLogin: false,
    signedIn: false,
    isTasksUploaded: 0,
};

export const ContextApp = React.createContext();

export const TasksContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    useEffect(() => {
        // const intervalId = setInterval(() => fetchData(dispatch, state.activeFilterBtn, false, state.isAdmin), 300000);

        // return () => clearInterval(intervalId);
    }, [state]);

    return <ContextApp.Provider value={{state, dispatch}}>{children}</ContextApp.Provider>;
};

export const taskReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.GET_TASKS.PENDING:{
            return {
                ...state,
                isLoading: action.noSetLoading
            };
        }

        case actionTypes.SET_ACTIVE_BUTTON: {
            console.log('@@@@@ ', action.payload)
            return {
                ...state,
                activeFilterBtn: action.payload
            };
        }

        case actionTypes.GET_TASKS.FULFILLED: {
            const isTasksUploaded = state.isTasksUploaded;
            const upload = isTasksUploaded ? action.payload.activeFilterBtn !==isTasksUploaded ? 3 : action.payload.activeFilterBtn : action.payload.activeFilterBtn;
            console.log('upload', isTasksUploaded, upload, [...state.tasks,...action.payload.data])

            return {
                ...state,
                tasks: [...state.tasks,...action.payload.data],
                isLoading: false,
                error: false,
                isTasksUploaded: upload
            };
        }
        case actionTypes.GET_TASKS.REJECTED: {
            const {isAdmin} = state;
            return {
                ...state,
                error: isAdmin ? action.payload : fetchError,
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

        case actionTypes.IMPORT_DB.FULFILLED: {
            return {
                ...state,
                tasks: action.payload
            };
        }

        case actionTypes.IMPORT_DB.REJECTED: {
            return {
                ...state,
                error: action.payload
            };
        }

        case actionTypes.CLEAR_TASKS: {
            return {
                ...state,
                tasks: action.payload
            };
        }

        default:
            return state;
    }
};

export const useTasks = () => {
    return useContext(ContextApp);
};
