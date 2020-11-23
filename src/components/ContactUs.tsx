import { Button, TextField } from '@material-ui/core';
import React from 'react';
import './App.css';
import Header from './Header';

export function ContactUs() {
    return (
        <>
            <Header />
            <div className='App'>
                <header className='App-header'>
                    <h3>Contact Us</h3>
                    <div className='App-body'>
                        <p>
                            Thank you for checking our the website. If you any suggestion please use the form below to contact our team and
                            we will get back to you as soon as possible.
                        </p>
                    </div>
                </header>
                <div className='App-contact'>
                    <TextField variant='outlined' margin='normal' id='name' label='Name' name='name' autoComplete='Name' autoFocus />
                </div>
                <div className='App-contact'>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        id='email'
                        label='Email'
                        name='email'
                        autoComplete='Email'
                        required
                        autoFocus
                    />
                </div>
                <div className='App-contact'>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        id='subject'
                        label='Subject'
                        name='subject'
                        autoComplete='Subject'
                        autoFocus
                    />
                </div>
                <div className='App-contact'>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        id='message'
                        label='Message'
                        name='message'
                        autoComplete='Message'
                        required
                        multiline
                        rowsMax={6}
                        autoFocus
                        style={{ width: '50%' }}
                    />
                </div>
                <Button variant='contained' color='primary'>
                    Send
                </Button>
            </div>
        </>
    );
}

export default ContactUs;
