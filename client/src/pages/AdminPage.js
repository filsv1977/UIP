import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {increment, decrement} from "./redux/tasksReducers"
// import {increment, decrement, addTask, removeTask} from './redux/tasks/tasksSlice'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Content from '../components/Content';
import '../App.css';

function AdminPage() {
    // const count = useSelector(state=> state.tasks.count)
    // const tasks = useSelector(state=> state.tasks.tasks)
    // // const dispatch = useDispatch()
    return <Content />;
}

export default AdminPage;
