import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Content from '../components/Content';
import '../App.css';
import {fetchData} from "../redux/tasks/fetchData";

function AdminPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData());
    }, []);

    return <Content />;
}

export default AdminPage;
