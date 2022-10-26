import React, {useEffect} from 'react';
import Content from '../components/Content';
import {useTasks} from '../сontext/reducer';
import {fetchData} from '../api/fetchData';
import {delAuthorizationKey} from '../utils/localStorage';
import useDataAvailability from "../hooks/useDataAvailability";

function HomePage({implemented}) {
    const {
        state: {isAdmin = false},
        dispatch
    } = useTasks();

    useEffect(() => {
        delAuthorizationKey();
        // fetchData(dispatch, implemented);
    }, []);

    return <Content isAdmin={isAdmin} activeButton={implemented+1} />;
}

export default HomePage;
