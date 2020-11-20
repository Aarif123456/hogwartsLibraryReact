import React from 'react';
import logo from '../resources/images/logo.svg';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './Header';

function App() {
    return (
        <>
            <Header />
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <Link to='/firstpage'> Go Here</Link>
                </header>
            </div>
        </>
    );
}

export default App;
