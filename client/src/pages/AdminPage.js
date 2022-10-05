import React, {useEffect, useState} from 'react';
import Content from '../components/Content';
import LoginModal from '../components/Modals/LoginModal';
import {useTasks} from '../Context/reducer';
import {fetchData} from '../api/fetchData';

function AdminPage() {
    const {
        state: {isAdmin = false},
        dispatch
    } = useTasks();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    useEffect(() => {
        fetchData(dispatch, null);
    }, []);

    return (
        <>
            <Content isAdmin={isAdmin} />
            <LoginModal show={visible} handleClose={() => setVisible(false)} />
        </>
    );
}

export default AdminPage;
