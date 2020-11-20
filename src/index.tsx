import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';
import { FirstPage } from './components';
import LoginPage from './components/LoginPage';
import { AboutUs, ContactUs, BrowseCatalogue, ReadingList, HouseFines } from './components';
import { Register } from './components/auth/Register';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route path='/firstPage'>
                    <FirstPage />
                </Route>
                <Route exact path='/LoginPage'>
                    <LoginPage />
                </Route>
                <Route exact path='/Register'>
                    <Register />
                </Route>
                <Route exact path='/AboutUs'>
                    <AboutUs />
                </Route>
                <Route exact path='/ContactUs'>
                    <ContactUs />
                </Route>
                <Route exact path='/BrowseCatalogue'>
                    <BrowseCatalogue />
                </Route>
                <Route exact path='/ReadingList'>
                    <ReadingList />
                </Route>
                <Route exact path='/HouseFines'>
                    <HouseFines />
                </Route>
                <Route exact path='/'>
                    <App />
                </Route>
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
