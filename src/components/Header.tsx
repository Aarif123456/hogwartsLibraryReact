import * as React from 'react';
import { makeStyles, createStyles, createMuiTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, Container, MuiThemeProvider, Menu, MenuItem } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import logo from '../resources/images/Home.png';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link, useHistory } from 'react-router-dom';
import UserStore from '../stores/UserStore';
import axios, { AxiosResponse } from 'axios';
import { runInAction } from 'mobx';
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[500]
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

const navLinks = [
    { title: 'browse catalogue', path: '/BrowseCatalogue' },
    { title: 'house fines', path: '/HouseFines' },
    { title: 'reading list', path: '/ReadingList' },
    { title: 'contact', path: '/ContactUs' },
    { title: 'about', path: '/AboutUs' }
    //{ title: 'log in', path: '/LoginPage' }
];

const Header: React.FC = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
                .get('https://arif115.myweb.cs.uwindsor.ca/hogwartslibrary/api/user/logout')
                .then(function(response: AxiosResponse) {
                    if (response.status === 200) {
                        UserStore.isLoggedIn = false;
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
    } else {
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
                    <Container maxWidth='md' className={classes.navbarDisplayFlex}>
                        <IconButton edge='start' color='inherit' aria-label='home'>
                            <Link to='/'>
                                <img src={logo} className='App-logo' alt='logo' />
                            </Link>
                        </IconButton>
                        <List component='nav' aria-labelledby='main navigation' className={classes.navDisplayFlex}>
                            {navLinks.map(({ title, path }) => (
                                <a href={path} key={title} className={classes.linkText}>
                                    <ListItem button>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                </a>
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
