import {useNavigate} from 'react-router-dom';
import {fetchData} from '../api/fetchData';
import {useTasks} from '../сontext/reducer';
import {exportDB} from '../api/getDB';
import {logOut} from '../api/logout';
import {implementedText, openText} from '../constants';
import {importDB} from '../api/importDB';
import {useMemo} from 'react';

export default function useAssignmentActions(isAdmin = false) {
    const {
        dispatch,
        state: {activeFilterBtn}
    } = useTasks();
    const navigate = useNavigate();

    const loadData = useMemo(() => {
        let prevButton = activeFilterBtn;
        return async (activeButton, setActive, dispatch) => {
            if (+activeButton === +prevButton) {
                return;
            }
            prevButton = activeButton;
            let path = activeButton ? '/implemented' : '/open';
            fetchData(dispatch, activeButton).then(_ => {
                navigate(path);
                setActive(activeButton);
            });
        };
    }, []);
    const userAction = {
        OPEN: 0,
        IMPLEMENTED: 1
    };

    const adminAction = {
        ALL: 0,
        OPEN: 1,
        IMPLEMENTED: 2,
        IMPORT: 3,
        EXPORT: 4,
        LOGOUT: 5
    };

    const assignmentUserActions = [
        {
            id: userAction.OPEN,
            text: openText,
            button: {
                variant: active => (+active === +userAction.OPEN ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e, setActive) => {
                loadData(userAction.OPEN, setActive, dispatch);
            }
        },
        {
            id: userAction.IMPLEMENTED,
            text: implementedText,
            button: {
                variant: active => (+active === +userAction.IMPLEMENTED ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e, setActive) => {
                loadData(userAction.IMPLEMENTED, setActive, dispatch);
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
