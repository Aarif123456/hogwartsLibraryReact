import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Radio, RadioGroup } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import { runInAction } from 'mobx';
import UserStore from '../../stores/UserStore';
import { API } from '../../constants';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1)
        },
        submit: {
            margin: theme.spacing(3, 0, 2)
        }
    })
);

const LoginForm: React.FC = () => {
    const classes = useStyles();
    const [userType, setUserType] = useState('user');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserType((event.target as HTMLInputElement).value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword((event.target as HTMLInputElement).value);
    };

    const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName((event.target as HTMLInputElement).value);
    };

    const FormData = require('form-data');

    const form = new FormData();
    form.append('username', username);
    form.append('userType', userType);
    form.append('password', password);

    const doLogin = () => {
        runInAction(() => {
            axios
                .post(API + 'verifyUser', form)
                .then(function(response: AxiosResponse) {
                    if (response.data.success) {
                        UserStore.storeLoggedIn(response.data.success);
                        UserStore.username = username;
                        console.log(response.data);
                    } else {
                        // console.log('failed');
                        console.log(response.data);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    Sign In
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label='Username'
                        name='username'
                        autoComplete='username'
                        autoFocus
                        onChange={handleUserName}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        onChange={handlePassword}
                    />
                    <RadioGroup aria-label='userType' name='userTypes' value={userType} onChange={handleChange} row>
                        <FormControlLabel value='user' control={<Radio />} label='User' />
                        <FormControlLabel value='librarian' control={<Radio />} label='Librarian' />
                    </RadioGroup>
                    <Button fullWidth variant='contained' color='primary' className={classes.submit} onClick={doLogin}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href='#' variant='body2'>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href='/Register' variant='body2'>
                                {"Don't have an account? Sign up!"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default LoginForm;
