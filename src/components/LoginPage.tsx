import React, { useEffect } from 'react';
import LoginForm from './auth/LoginForm';
import axios, { AxiosResponse } from 'axios';
import UserStore from '../stores/UserStore';
import { observer } from 'mobx-react';
import { createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
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
                    console.log(response.data);
                    UserStore.storeLoggedIn(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                    UserStore.loading = false;
                    UserStore.isLoggedIn = false;
                });

            if (UserStore.isLoggedIn) {
                UserStore.loading = false;
            } else {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
            }
        });
    }, []);

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
        <>
            <Header />
            <div className='container'>No Bueno</div>
        </>
    );
};

export default observer(LoginPage);
