import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid, Paper, Radio, RadioGroup } from '@material-ui/core';
import UserStore from '../../stores/UserStore';

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
        root: {
            flexGrow: 1
        },
        grid: {
            padding: theme.spacing(10),
            textAlign: 'center',
            justify: 'center',
            alignItems: 'center'
        }
    })
);

export const Register: React.FC = () => {
    const classes = useStyles();
    const [userType, setUserType] = useState('user');
    const [errorText, setErrorText] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserType((event.target as HTMLInputElement).value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword((event.target as HTMLInputElement).value);
    };

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName((event.target as HTMLInputElement).value);
        UserStore.username = userName;
    };

    const errorCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === password) {
            setErrorText('');
        } else {
            setErrorText('Passwords do not match.');
        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={1} className={classes.grid}>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Container component='main' maxWidth='xs'>
                            <CssBaseline />
                            <div className={classes.paper}>
                                <Typography component='h1' variant='h5'>
                                    Sign Up
                                </Typography>
                                <form className={classes.form} noValidate>
                                    <TextField
                                        variant='outlined'
                                        margin='normal'
                                        required
                                        fullWidth
                                        id='fname'
                                        label='First Name'
                                        name='fname'
                                        autoFocus
                                    />
                                    <TextField
                                        variant='outlined'
                                        margin='normal'
                                        required
                                        fullWidth
                                        id='lname'
                                        label='Last Name'
                                        name='lname'
                                    />
                                    <TextField
                                        variant='outlined'
                                        margin='normal'
                                        required
                                        fullWidth
                                        id='email'
                                        label='Email Address'
                                        name='email'
                                        autoComplete='email'
                                        onChange={handleEmail}
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
                                    <TextField
                                        variant='outlined'
                                        error={errorText.length !== 0}
                                        margin='normal'
                                        required
                                        fullWidth
                                        name='password'
                                        label='Confirm Password'
                                        type='password'
                                        id='cpassword'
                                        helperText={errorText}
                                        onChange={errorCheck}
                                    />
                                    <RadioGroup aria-label='userType' name='userTypes' value={userType} onChange={handleChange} row>
                                        <FormControlLabel value='user' control={<Radio />} label='User' />
                                        <FormControlLabel value='librarian' control={<Radio />} label='Librarian' />
                                    </RadioGroup>
                                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                                        Sign Up
                                    </Button>
                                </form>
                            </div>
                        </Container>
                    </Paper>
                </Grid>
                <Grid item xs={4} />
            </Grid>
        </div>
    );
};
