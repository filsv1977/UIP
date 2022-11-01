import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import './custom.scss';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter history={History} basename={process.env.REACT_APP_BASENAME}>
        <App />
    </BrowserRouter>
);

reportWebVitals();
