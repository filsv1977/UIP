import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
    const count = useSelector(state => state.tasks.count);
    const tasks = useSelector(state => state.tasks.tasks);
    const dispatch = useDispatch();
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

{
    /*     <div className="App">*/
}
{
    /*       <NavBar/>*/
}
{
    /*      <div className="container">*/
}
{
    /*        <MainContainer/>*/
}
{
    /*        </div>*/
}
{
    /*        {count}*/
}
{
    /*       <div className="container">*/
}
{
    /*          <button onClick={()=> dispatch(increment())}></button>*/
}
{
    /*         <button onClick={()=> dispatch(decrement())}></button>*/
}
{
    /*        <button onClick={()=> dispatch(addTask(count))}></button>*/
}
{
    /*         <button onClick={()=> dispatch(removeTask(count-1))}></button>*/
}
{
    /*        </div>*/
}
{
    /*        <ul>*/
}
{
    /*     /    {tasks.map((task,index)=>*/
}
{
    /*      <li key={index}>{task}</li>*/
}
{
    /*   )}*/
}
{
    /*  </ul>*/
}
{
    /*  <Footer/>*/
}
{
    /*</div>*/
}
