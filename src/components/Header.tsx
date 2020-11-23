import React, { useState } from 'react';
import { createMuiTheme, createStyles, makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, IconButton, List, ListItem, ListItemText, Menu, MenuItem, MuiThemeProvider, Toolbar } from '@material-ui/core';
import logo from '../resources/images/Home.png';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link, useHistory } from 'react-router-dom';
import UserStore from '../stores/UserStore';
import axios, { AxiosResponse } from 'axios';
import { runInAction } from 'mobx';
import { blue } from '@material-ui/core/colors';
import { API } from '../constants';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#36445E'
        },
        secondary: {
            main: blue[500]
        }
    }
});

const useStyles = makeStyles(
    createStyles({
        navbarDisplayFlex: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        navDisplayFlex: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        linkText: {
            textDecoration: 'none',
            textTransform: 'uppercase',
            color: 'white'
        },
        section: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex'
            }
        }
    })
);

let navLinks = [
    { title: 'browse catalogue', path: '/BrowseCatalogue' },
    { title: 'house fines', path: '/HouseFines' },
    { title: 'reading list', path: '/ReadingList' },
    { title: 'contact', path: '/ContactUs' },
    { title: 'about', path: '/AboutUs' }
];

const Header: React.FC = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const history = useHistory();

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogButton = () => {
        setAnchorEl(null);
        history.push('/LoginPage');
    };

    const handleLogout = () => {
        setAnchorEl(null);
        runInAction(() => {
            axios
                .get(API + '/user/logout')
                .then(function(response: AxiosResponse) {
                    if (response.status === 200) {
                        UserStore.storeLoggedIn(false);
                        UserStore.username = '';
                        UserStore.loading = true;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        });

        history.push('/LoginPage');
    };

    const menuId = 'primary-search-account-menu';
    let renderMenu;
    if (UserStore.isLoggedIn) {
        renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        );
        if (UserStore.usertype === 'librarian') {
            navLinks = [
                { title: 'check out', path: '/Checkout' },
                { title: 'returns', path: '/Returns' },
                { title: 'holds', path: '/Holds' },
                { title: 'fines', path: '/Fines' },
                { title: 'request list', path: '/RequestList' },
                { title: 'reserve books', path: '/ReserveBooksL' }
            ];
        } else if (UserStore.usertype === 'student') {
            navLinks = [
                { title: 'browse catalogue', path: '/BrowseCatalogue' },
                { title: 'checked out', path: '/CheckedOut' },
                { title: 'holds', path: '/Holds' },
                { title: 'fines', path: '/Fines' }
                // { title: 'submit request', path: '/SubmitRequest' },
                // { title: 'reserve books', path: '/ReserveBooksS' }
            ];
        } else if (UserStore.usertype === 'professor') {
            navLinks = [
                { title: 'browse catalogue', path: '/BrowseCatalogue' },
                { title: 'checked out', path: '/CheckedOut' },
                { title: 'holds', path: '/Holds' },
                { title: 'fines', path: '/Fines' },
                { title: 'submit request', path: '/SubmitRequest' },
                { title: 'reserve books', path: '/ReserveBooksP' }
            ];
        } else if (UserStore.usertype === 'headmaster') {
            navLinks = [
                { title: 'browse catalogue', path: '/BrowseCatalogue' },
                { title: 'manage librarians', path: '/ManageLibrarians' },
                { title: 'manage courses', path: '/ManageCourses' },
                { title: 'manage enrollments', path: '/ManageEnrollments' },
                { title: 'manage requests', path: '/ManageRequests' },
                { title: 'passwords', path: '/Passwords' }
            ];
        }
    } else {
        navLinks = [
            { title: 'browse catalogue', path: '/BrowseCatalogue' },
            { title: 'house fines', path: '/HouseFines' },
            // { title: 'reading list', path: '/ReadingList' },
            { title: 'contact', path: '/ContactUs' },
            { title: 'about', path: '/AboutUs' }
        ];
        renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}>
                <MenuItem onClick={handleLogButton}>Login</MenuItem>
            </Menu>
        );
    }

    return (
        <MuiThemeProvider theme={theme}>
            <AppBar position='static'>
                <Toolbar>
                    <Container maxWidth='xl' className={classes.navbarDisplayFlex}>
                        <IconButton edge='start' color='inherit' aria-label='home'>
                            <Link to='/'>
                                <img src={logo} className='App-logo' alt='logo' />
                            </Link>
                        </IconButton>
                        <List component='nav' aria-labelledby='main navigation' className={classes.navDisplayFlex}>
                            {navLinks.map(({ title, path }) => (
                                <Link to={path} key={title} className={classes.linkText}>
                                    <ListItem button>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                        <div className={classes.section}>
                            <IconButton
                                edge='end'
                                aria-label='account of current user'
                                aria-controls={menuId}
                                aria-haspopup='true'
                                onClick={handleProfileMenuOpen}
                                color='inherit'>
                                <AccountCircle />
                            </IconButton>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </MuiThemeProvider>
    );
};

export default Header;
