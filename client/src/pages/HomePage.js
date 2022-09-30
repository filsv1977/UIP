import React from 'react';
import Content from '../components/Content';
import {useTasks} from '../Context/reducer';

function HomePage() {
    const {
        state: {isAdmin = false}
    } = useTasks();
    return <Content isAdmin={isAdmin} />;
}

export default HomePage;
