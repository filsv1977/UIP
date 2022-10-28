import React, {useEffect} from 'react';
import Content from '../components/Content';
import {useTasks} from '../сontext/reducer';
import {delAuthorizationKey} from '../utils/localStorage';
import {actionTypes} from "../сontext/actionTypes";

function HomePage({implemented}) {
    const {
        state: {isAdmin = false},
        dispatch
    } = useTasks();

    useEffect(() => {
        dispatch({
            type: actionTypes.SET_ACTIVE_FILTER_BUTTON,
            payload: implemented
        });
        delAuthorizationKey();
    }, []);

    return <Content isAdmin={isAdmin} activeButton={implemented} />;
}

export default HomePage;
