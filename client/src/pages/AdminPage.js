import React, {useEffect} from 'react';
import LoginModal from '../components/Modals/LoginModal';
import {useTasks} from '../сontext/reducer';
import {getAuthorizationKey} from '../utils/localStorage';
import {actionTypes} from '../сontext/actionTypes';
import {checkToken} from '../api/checkToken';
import ContentAdmin from '../components/ContentAdmin';

function AdminPage() {
    const {dispatch} = useTasks();

    useEffect(() => {
        const token = getAuthorizationKey();
        if (token) {
            checkToken(dispatch);
        } else {
            dispatch({
                type: actionTypes.SET_VISIBLE,
                payload: true
            });
        }
    }, []);

    return (
        <>
            <ContentAdmin />
            <LoginModal />
        </>
    );
}

export default AdminPage;
