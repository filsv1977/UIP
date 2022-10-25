import {useNavigate} from 'react-router-dom';
import {fetchData} from '../api/fetchData';
import {useTasks} from '../сontext/reducer';
import {exportDB} from '../api/getDB';
import {logOut} from '../api/logout';
import {implementedText, openText} from '../constants';

export default function useAssignmentActions(isAdmin = false) {
    const {dispatch} = useTasks();
    const navigate = useNavigate();
    const userAction = {
        OPEN: 0,
        IMPLEMENTED: 1
    };

    const adminAction = {
        ALL: 0,
        OPEN: 1,
        IMPLEMENTED: 2,
        EXPORT: 3,
        LOGOUT: 4
    };

    const assignmentUserActions = [
        {
            id: userAction.OPEN,
            text: openText,
            button: {
                variant: active => (+active === +userAction.OPEN ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e, setActive) => {
                fetchData(dispatch, userAction.OPEN).then(_ => {
                    navigate('/open');
                    setActive(userAction.OPEN);
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
                fetchData(dispatch, userAction.IMPLEMENTED).then(_ => {
                    navigate('/implemented');
                    setActive(userAction.IMPLEMENTED);
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
            onClick: (e, setActive) => {
                fetchData(dispatch, null, null, true).then(_ => {
                    setActive(adminAction.ALL);
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
            onClick: (e, setActive) => {
                fetchData(dispatch, 0, null, true).then(_ => setActive(adminAction.OPEN));
            }
        },
        {
            id: adminAction.IMPLEMENTED,
            text: implementedText,
            route: 'implemented',
            button: {
                variant: active => (+active === +adminAction.IMPLEMENTED ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e, setActive) =>
                fetchData(dispatch, 1, null, true).then(_ => {
                    setActive(adminAction.IMPLEMENTED);
                })
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
