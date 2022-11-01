import {useTasks} from '../сontext/reducer';
import {useNavigate} from 'react-router-dom';
import {useEffect, useMemo} from 'react';
import {fetchOpen} from '../api/fetchOpen';
import {fetchImplemented} from '../api/fetchImplemented';

export default function useDataAvailability() {
    const {state, dispatch} = useTasks();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state.isAdmin) {
            state.activeFilterBtn
                ? loadImplemented(state.implementedTasks, dispatch)
                : loadOpen(state.openTasks, dispatch);
        }
    }, [state.activeFilterBtn]);

    const loadOpen = useMemo(() => {
        let prevOpen;
        return async (openTasks, dispatch) => {
            if (openTasks.length) {
                navigate('/open');
                return;
            }

            fetchOpen(dispatch, 0).then(_ => {
                navigate('/open');
            });
        };
    }, []);

    const loadImplemented = useMemo(() => {
        let prevImplemented;
        return async (implementedTasks, dispatch) => {
            if (implementedTasks.length) {
                navigate('/implemented');
                return;
            }

            fetchImplemented(dispatch, 1).then(_ => {
                navigate('/implemented');
            });
        };
    }, []);

    return {
        tasks: state.activeFilterBtn ? state.implementedTasks : state.openTasks
    };
}
