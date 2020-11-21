import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import { runInAction } from 'mobx';
import UserStore from '../../stores/UserStore';
import { instance } from '../../constants';
import { useHistory } from 'react-router';

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
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        }
    })
);

const LoginForm: React.FC = () => {
    const classes = useStyles();
    const [userType, setUserType] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const history = useHistory();
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setUserType(event.target.value as string);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword((event.target as HTMLInputElement).value);
        setErrorText('');
    };

    const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName((event.target as HTMLInputElement).value);
        setErrorText('');
    };

    const FormData = require('form-data');

    const form = new FormData();
    form.append('username', username);
    form.append('userType', userType);
    form.append('password', password);

    const doLogin = () => {
        runInAction(() => {
            instance
                .post('verifyUser', form)
                .then(function(response: AxiosResponse) {
                    if (response.data.success) {
                        UserStore.storeLoggedIn(response.data.success);
                        UserStore.username = username;
                        UserStore.usertype = userType;
                        console.log(response.data);
                        history.push('/');
                    } else {
                        setErrorText('Invalid Username or Password');
                        console.log(response.data);
                    }
                })
                .catch(function(error) {
                    setErrorText('Invalid Username or Password');
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
                        error={errorText.length !== 0}
                        required
                        fullWidth
                        id='username'
                        label='Username'
                        name='username'
                        autoComplete='username'
                        helperText={errorText}
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
                    <FormControl className={classes.formControl}>
                        <InputLabel id='select-user-type' required>
                            User Type
                        </InputLabel>
                        <Select labelId='select-user-type' id='select-user-type' value={userType} onChange={handleChange} required>
                            <MenuItem value='student'>Student</MenuItem>
                            <MenuItem value='librarian'>Librarian</MenuItem>
                            <MenuItem value='professor'>Professor</MenuItem>
                            <MenuItem value='headmaster'>Headmaster</MenuItem>
                        </Select>
                    </FormControl>
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
