import {useNavigate} from 'react-router-dom';
import {fetchData} from '../api/fetchData';
import {useTasks} from '../сontext/reducer';
import {exportDB} from '../api/getDB';
import {logOut} from '../api/logout';
import {implementedText, openText} from '../constants';
import {importDB} from '../api/importDB';
import {actionTypes} from "../сontext/actionTypes";

export default function useAssignmentActions(isAdmin = false) {
    const {dispatch} = useTasks();
    const navigate = useNavigate();
    const userAction = {
        OPEN: 1,
        IMPLEMENTED: 2
    };

    const adminAction = {
        ALL: 3,
        OPEN: 1,
        IMPLEMENTED: 2,
        IMPORT: 4,
        EXPORT: 5,
        LOGOUT: 6
    };

    const assignmentUserActions = [
        {
            id: userAction.OPEN,
            text: openText,
            button: {
                variant: active => (+active === +userAction.OPEN ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e) => {
                    navigate('/open');
                     dispatch({
                    type: actionTypes.SET_ACTIVE_BUTTON,
                    payload: userAction.OPEN
                });
            }
        },
        {
            id: userAction.IMPLEMENTED,
            text: implementedText,
            button: {
                variant: active => (+active === +userAction.IMPLEMENTED ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e, setActive) => {
                    navigate('/implemented');
                dispatch({
                    type: actionTypes.SET_ACTIVE_BUTTON,
                    payload: userAction.IMPLEMENTED
                });
            }
        }
    ];

    const assignmentAdminActions = [
        {
            id: adminAction.ALL,
            text: 'All',
            route: 'open',
            button: {
                variant: active => (+active === +adminAction.ALL ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e) => {

                dispatch({
                    type: actionTypes.SET_ACTIVE_BUTTON,
                    payload: adminAction.ALL
                });
            }
        },
        {
            id: adminAction.OPEN,
            text: openText,
            route: 'open',
            button: {
                variant: active => (+active === +adminAction.OPEN ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e) => {
                dispatch({
                    type: actionTypes.SET_ACTIVE_BUTTON,
                    payload: adminAction.OPEN
                });
            }
        },
        {
            id: adminAction.IMPLEMENTED,
            text: implementedText,
            route: 'implemented',
            button: {
                variant: active => (+active === +adminAction.IMPLEMENTED ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e) => {
                dispatch({
                    type: actionTypes.SET_ACTIVE_BUTTON,
                    payload: adminAction.IMPLEMENTED
                });
            }
        },
        {
            id: adminAction.IMPORT,
            text: 'Import',
            route: 'implemented',
            button: {
                variant: _ => 'btn btn-outline-secondary'
            },
            onClick: () => importDB(dispatch)
        },
        {
            id: adminAction.EXPORT,
            text: 'Export',
            route: 'implemented',
            button: {
                variant: _ => 'btn btn-outline-secondary'
            },
            onClick: () => exportDB(dispatch)
        },
        {
            id: adminAction.LOGOUT,
            text: 'Logout',
            route: 'implemented',
            button: {
                variant: _ => 'btn btn-outline-secondary'
            },
            onClick: () =>
                logOut(dispatch).then(() => {
                    navigate('/');
                })
        }
    ];
    const assignmentFilterActions = isAdmin ? assignmentAdminActions : assignmentUserActions;
    return {
        assignmentFilterActions
    };
}
