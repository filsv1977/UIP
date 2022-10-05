import React, {useEffect} from 'react';
import Content from '../components/Content';
import {useTasks} from '../Context/reducer';
import {fetchData} from "../api/fetchData";

function HomePage({implemented}) {
    const {
        state: {isAdmin = false},dispatch
    } = useTasks();

    useEffect(() => {
        console.log(111, implemented)
        fetchData(dispatch, implemented);
    }, []);

    return <Content isAdmin={isAdmin} implemented={implemented} />;
}

export default HomePage;
