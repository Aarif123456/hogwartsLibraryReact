import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';
import LoginPage from './components/LoginPage';
import { AboutUs, ContactUs, BrowseCatalogue, ReadingList, HouseFines } from './components';
import { Register } from './components/auth/Register';
import Fines from './components/Fines';
import { CheckedOut } from './components/CheckedOut';
import { Holds } from './components/Holds';
import { RequestList } from './components/RequestList';
import { ReserveBooksS } from './components/ReserveBooksS';
import { ReserveBooksL } from './components/ReserveBooksL';
import { Returns } from './components/Returns';
import { SubmitRequests } from './components/SubmitRequests';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
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
                <Route exact path='/Fines'>
                    <Fines />
                </Route>
                <Route exact path='/CheckedOut'>
                    <CheckedOut />
                </Route>
                <Route exact path='/Holds'>
                    <Holds />
                </Route>
                <Route exact path='/RequestList'>
                    <RequestList />
                </Route>
                <Route exact path='/ReserveBooksS'>
                    <ReserveBooksS />
                </Route>
                <Route exact path='/ReserveBooksL'>
                    <ReserveBooksL />
                </Route>
                <Route exact path='/'>
                    <App />
                </Route>
                <Route exact path='/Returns'>
                    <Returns />
                </Route>
                <Route exact path='/SubmitRequests'>
                    <SubmitRequests />
                </Route>
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
