import {useNavigate} from 'react-router-dom';
import {fetchData} from '../api/fetchData';
import {useTasks} from '../сontext/reducer';
import {exportDB} from '../api/getDB';
import {logOut} from '../api/logout';
import {adminAction, implementedText, openText, userAction} from '../constants';
import {importDB} from '../api/importDB';
import {setUbiTimerKey} from '../utils/localStorage';

export default function useAssignmentActions(isAdmin = false) {
    const {dispatch} = useTasks();
    const navigate = useNavigate();

    const assignmentUserActions = [
        {
            id: userAction.OPEN,
            text: openText,
            button: {
                variant: active => (+active === +userAction.OPEN ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e, setActive) => {
                fetchData(dispatch, 0, null, false).then(_ => {
                    setActive(userAction.OPEN);
                    navigate('/open');
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
                fetchData(dispatch, 1, null, false).then(_ => {
                    setActive(userAction.IMPLEMENTED);
                    navigate('/implemented');
                });
            }
        }
    ];

    const assignmentAdminActions = [
        {
            id: adminAction.ALL,
            text: 'All',
            button: {
                variant: active => (+active === +adminAction.ALL ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e, setActive) => {
                fetchData(dispatch, null, null, true).then(_ => {
                    setActive(adminAction.ALL);
                    setUbiTimerKey();
                });
            }
        },
        {
            id: adminAction.OPEN,
            text: openText,
            button: {
                variant: active => (+active === +adminAction.OPEN ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e, setActive) => {
                fetchData(dispatch, 0, null, true).then(_ => {
                    setActive(adminAction.OPEN);
                    setUbiTimerKey();
                });
            }
        },
        {
            id: adminAction.IMPLEMENTED,
            text: implementedText,
            button: {
                variant: active => (+active === +adminAction.IMPLEMENTED ? 'outline-danger' : 'outline-primary')
            },
            onClick: (e, setActive) =>
                fetchData(dispatch, 1, null, true).then(_ => {
                    setActive(adminAction.IMPLEMENTED);
                    setUbiTimerKey();
                })
        },
        {
            id: adminAction.IMPORT,
            text: 'Import',
            button: {
                variant: _ => 'btn btn-outline-secondary'
            },
            onClick: (e, setActive) => importDB(dispatch, setActive)
        },
        {
            id: adminAction.EXPORT,
            text: 'Export',
            button: {
                variant: _ => 'btn btn-outline-secondary'
            },
            onClick: () => exportDB(dispatch)
        },
        {
            id: adminAction.LOGOUT,
            text: 'Logout',
            button: {
                variant: _ => 'btn btn-outline-secondary'
            },
            onClick: () =>
                logOut(dispatch).then(() => {
                    navigate('/open');
                })
        }
    ];
    const assignmentFilterActions = isAdmin ? assignmentAdminActions : assignmentUserActions;
    return {
        assignmentFilterActions
    };
}
