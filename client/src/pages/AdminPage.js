import React, {useEffect, useState} from 'react';
import Content from '../components/Content';
import LoginModal from '../components/Modals/LoginModal';
import {useTasks} from '../Context/reducer';
import {getAuthorizationKey} from '../utils/localStorage';
import {logIn} from '../api/login';

function AdminPage() {
    const {
        state: {isAdmin},
        dispatch
    } = useTasks();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const token = getAuthorizationKey();
        if (token) {
            logIn({...token}, dispatch);
        }

        if (!isAdmin) setVisible(true);
    }, []);

    return (
        <>
            <Content isAdmin={isAdmin} />
            <LoginModal show={visible} handleClose={() => setVisible(false)} />
        </>
    );
}

export default AdminPage;
