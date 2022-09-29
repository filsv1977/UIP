import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchData} from "../redux/tasks/fetchData";
import Content from "../components/Content";


function HomePage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData());
    }, []);

    return <Content />;
}

export default HomePage;
