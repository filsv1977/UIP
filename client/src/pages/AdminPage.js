import React, {useEffect} from 'react';
import Content from '../components/Content';
import LoginModal from '../components/Modals/LoginModal';
import {useTasks} from '../сontext/reducer';
import {getAuthorizationKey} from '../utils/localStorage';
import {actionTypes} from '../сontext/actionTypes';
import {checkToken} from '../api/checkToken';

function AdminPage() {
    const {
        state: {isAdmin},
        dispatch
    } = useTasks();

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
            <Content isAdmin={isAdmin}/>
            <LoginModal />
        </>
    );
}

export default AdminPage;
