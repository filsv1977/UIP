import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {increment, decrement} from "./redux/tasksReducers"
// import {increment, decrement, addTask, removeTask} from './redux/tasks/tasksSlice'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Content from '../components/Content';
import '../App.css';
import {fetchData} from '../redux/tasks/fetchData';

function HomePage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData());
    }, []);

    return <Content />;
}

export default HomePage;
