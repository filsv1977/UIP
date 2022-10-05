import React, {useEffect} from 'react';
import Content from '../components/Content';
import {useTasks} from '../Context/reducer';
import {fetchData} from "../api/fetchData";

function HomePage({implemented}) {
    const {
        state: {isAdmin = false},dispatch
    } = useTasks();

    useEffect(() => {
        fetchData(dispatch, implemented);
    }, []);

    return <Content isAdmin={isAdmin} />;
}

export default HomePage;
