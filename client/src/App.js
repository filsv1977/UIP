import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer';
import {TasksContextProvider} from './сontext/reducer';
import Header from './components/Header';

function App() {
    return (
        <TasksContextProvider>
            <div className="d-flex flex-column min-vh-100 ">
                <Header />
                <Routes>
                    <Route path="/open" element={<HomePage implemented={0} />} />
                    <Route path="/implemented" exact element={<HomePage implemented={1} />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/*" exact element={<Navigate to="/open" replace />} />
                </Routes>
                <Footer />
            </div>
        </TasksContextProvider>
    );
}

export default App;
