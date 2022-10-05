import React from 'react';
import Content from '../components/Content';
import {useTasks} from '../Context/reducer';

function HomePage({implemented}) {
    const {
        state: {isAdmin = false}
    } = useTasks();
    return <Content isAdmin={isAdmin} implemented={implemented} />;
}

export default HomePage;
