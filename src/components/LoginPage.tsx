import React, { useEffect } from 'react';
import LoginForm from './auth/LoginForm';
import axios, { AxiosResponse } from 'axios';
import UserStore from '../stores/UserStore';
import { observer } from 'mobx-react';
import { Button, Container, createStyles, CssBaseline, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { runInAction } from 'mobx';
import { API } from '../constants';
import Header from './Header';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center'
        },
        grid: {
            padding: theme.spacing(10),
            textAlign: 'center',
            alignItems: 'center'
        },
        submit: {
            margin: theme.spacing(3, 0, 2)
        }
    })
);

const LoginPage = () => {
    const classes = useStyles();

    useEffect(() => {
        runInAction(() => {
            axios
                .get(API + '/user/isLoggedIn')
                .then((response: AxiosResponse) => {
                    console.log('Here: ' + response.data);
                    UserStore.storeLoggedIn(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                    UserStore.loading = false;
                    UserStore.storeLoggedIn(false);
                });

            if (UserStore.isLoggedIn) {
                UserStore.loading = false;
            } else {
                UserStore.loading = false;
                UserStore.storeLoggedIn(false);
            }
        });
    }, []);

    const doLogout = () => {
        runInAction(() => {
            axios
                .get(API + '/user/logout')
                .then(function(response: AxiosResponse) {
                    if (response.status === 200) {
                        UserStore.storeLoggedIn(false);
                        UserStore.username = '';
                        UserStore.usertype = '';
                        UserStore.loading = true;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    };

    if (!UserStore.isLoggedIn) {
        return (
            <div className={classes.root}>
                <Header />
                <Grid container spacing={1} className={classes.grid}>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <LoginForm />
                        </Paper>
                    </Grid>
                    <Grid item xs={4} />
                </Grid>
            </div>
        );
    }
    return (
        <div className={classes.root}>
            <Header />
            <Grid container spacing={1} className={classes.grid}>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Container component='main' maxWidth='xs'>
                            <CssBaseline />
                            <div className={classes.paper}>
                                <Typography component='h1' variant='h5'>
                                    Already Signed In! Would you like to Sign Out?
                                </Typography>
                                <Button fullWidth variant='contained' color='primary' className={classes.submit} onClick={doLogout}>
                                    Sign Out
                                </Button>
                            </div>
                        </Container>
                    </Paper>
                </Grid>
                <Grid item xs={4} />
            </Grid>
        </div>
    );
};

export default observer(LoginPage);
