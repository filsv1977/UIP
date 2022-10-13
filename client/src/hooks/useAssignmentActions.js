import {useNavigate} from 'react-router-dom';
import {fetchData} from '../api/fetchData';
import {useTasks} from '../Context/reducer';
import {exportDB} from '../api/getDB';
import {logOut} from '../api/logout';

export default function useAssignmentActions(isAdmin = false) {
    const {dispatch} = useTasks();
    const navigate = useNavigate();
    const userAction = {
        OPEN: 0,
        CLOSED: 1
    };

    const adminAction = {
        ALL: 0,
        OPEN: 1,
        CLOSED: 2,
        EXPORT: 3,
        LOGOUT: 4
    };

    const assignmentUserActions = [
        {
            id: userAction.OPEN,
            text: 'Open',
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
            id: userAction.CLOSED,
            text: 'Closed',
            button: {
                variant: active => (+active === +userAction.CLOSED ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e, setActive) => {
                fetchData(dispatch, userAction.CLOSED).then(_ => {
                    navigate('/implemented');
                    setActive(userAction.CLOSED);
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
                fetchData(dispatch, null).then(_ => {
                    setActive(adminAction.ALL);
                });
            }
        },
        {
            id: adminAction.OPEN,
            text: 'Open',
            route: 'open',
            button: {
                variant: active => (+active === +adminAction.OPEN ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e, setActive) => {
                fetchData(dispatch, 0).then(_ => setActive(adminAction.OPEN));
            }
        },
        {
            id: adminAction.CLOSED,
            text: 'Closed',
            route: 'implemented',
            button: {
                variant: active => (+active === +adminAction.CLOSED ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e, setActive) => fetchData(dispatch, 1).then(_ => setActive(adminAction.CLOSED))
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
