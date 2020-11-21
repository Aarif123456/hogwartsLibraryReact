import React from 'react';
import './App.css';
import Header from './Header';

export function CheckedOut() {
    return (
        <>
            <Header />
            <div className='App'>
                <header className='App-header'>
                    <p>Checked Out</p>
                </header>
            </div>
        </>
    );
}
