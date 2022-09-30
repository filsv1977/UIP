import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import {TasksContextProvider} from './Context/reducer';
import './App.css';

function App() {
    return (
        <TasksContextProvider>
            <div className="d-flex flex-column min-vh-100 p-10">
                <NavBar />
                <Routes>
                    <Route path="/" exact element={<HomePage />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
                <Footer />
            </div>
        </TasksContextProvider>
    );
}

export default App;
