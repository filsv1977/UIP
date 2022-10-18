import React, {useEffect} from 'react';
import Content from '../components/Content';
import {useTasks} from '../Context/reducer';
import {fetchData} from '../api/fetchData';
import {delAuthorizationKey} from '../utils/localStorage';

function HomePage({implemented}) {
    const {
        state: {isAdmin = false},
        dispatch
    } = useTasks();

    useEffect(() => {
        delAuthorizationKey();
        fetchData(dispatch, implemented);
    }, []);

    return <Content isAdmin={isAdmin} activeButton={implemented} />;
}

export default HomePage;
