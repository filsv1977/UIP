import React, {useEffect, useState} from 'react';
import Content from '../components/Content';
import LoginModal from '../components/Modals/LoginModal';
import {useTasks} from '../Context/reducer';
import {getAuthorizationKey} from '../utils/localStorage';
import {logIn} from '../api/login';
import {actionTypes} from "../Context/actionTypes";
import {checkToken} from "../api/checkToken";

function AdminPage() {
    const {
        state: {isAdmin, showLogin, signedIn},
        dispatch
    } = useTasks();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const token = getAuthorizationKey();
        if (token) {
            // logIn({...token}, dispatch);
            checkToken(dispatch)

        }

        if (!signedIn) dispatch({
                type: actionTypes.SET_VISIBLE,
                payload: true
            });

        // if (!isAdmin) setVisible(true);
    }, []);

    return (
        <>
            <Content isAdmin={isAdmin} />
            <LoginModal show={showLogin} handleClose={() => setVisible(false)} />
        </>
    );
}

export default AdminPage;
