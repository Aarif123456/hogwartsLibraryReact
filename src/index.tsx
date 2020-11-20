import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';
import { FirstPage } from './components';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Register from './components/auth/Register';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route path='/firstPage'>
                    <Header />
                    <FirstPage />
                </Route>
                <Route exact path='/LoginPage'>
                    <Header />
                    <LoginPage />
                </Route>
                <Route exact path='/Register'>
                    <Header />
                    <Register />
                </Route>
                <Route exact path='/'>
                    <Header />
                    <App />
                </Route>
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
