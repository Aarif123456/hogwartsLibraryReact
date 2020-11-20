import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';
import { FirstPage } from './components';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Register from './components/auth/Register';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import BrowseCatalogue from './components/BrowseCatalogue';
import ReadingList from './components/ReadingList';
import HouseFines from './components/HouseFines';

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
                <Route exact path='/AboutUs'>
                    <Header />
                    <AboutUs />
                </Route>
                <Route exact path='/ContactUs'>
                    <Header />
                    <ContactUs />
                </Route>
                <Route exact path='/BrowseCatalogue'>
                    <Header />
                    <BrowseCatalogue />
                </Route>
                <Route exact path='/ReadingList'>
                    <Header />
                    <ReadingList />
                </Route>
                <Route exact path='/HouseFines'>
                    <Header />
                    <HouseFines />
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
