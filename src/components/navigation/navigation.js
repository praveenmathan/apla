import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logo from '../../assets/images/nike-logo.png';
import slimlogin from '../../assets/images/slim-apla-logo-login.png';
import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';

//const primary = grey[900];

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#222222'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: 'bold',
        textAlign: 'center'
    },
}));

export default function MenuAppBar(props) {
    const { authState, oktaAuth } = useOktaAuth();
    const classes = useStyles();
    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const login = async () => oktaAuth.signInWithRedirect();
    const logout = async () => oktaAuth.signOut();
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <img src={logo} className="App-logo" alt="logo" />
                    <Typography variant="h6" className={classes.title}>
                        <img src={slimlogin} alt='' className="slim-logo-navigation" />
                    </Typography>
                    {auth && (
                        <div>
                            {(!props.authentication) ? 'fetching data...' : props.authentication.email}
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                {authState.isAuthenticated && (
                                    <MenuItem>
                                        <Link to="/profile">Profile</Link>
                                    </MenuItem>
                                )}
                                {authState.isAuthenticated && (
                                    <MenuItem id="logout-button" onClick={logout}>Logout</MenuItem>
                                )}
                                {!authState.isPending && !authState.isAuthenticated && (
                                    <MenuItem onClick={login}>Login</MenuItem>
                                )}
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}