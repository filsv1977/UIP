import React, {useEffect, useState} from 'react';
import Content from '../components/Content';
import LoginModal from '../components/Modals/LoginModal';
import {useTasks} from '../Context/reducer';
import {getAuthorizationKey} from '../utils/localStorage';
import {logIn} from '../api/login';

function AdminPage() {
    const {
        state: {isAdmin = false},
        dispatch
    } = useTasks();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const {login, password} = getAuthorizationKey();
        if (login && password) {
            logIn({login, password}, dispatch);
        }
        setVisible(true);
    }, []);

    return (
        <>
            <Content isAdmin={isAdmin} />
            <LoginModal show={visible} handleClose={() => setVisible(false)} />
        </>
    );
}

export default AdminPage;
