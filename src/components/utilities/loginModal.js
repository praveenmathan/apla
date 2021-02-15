import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import slimlogin from '../../assets/images/slim-login.png';
import { Form } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import { useOktaAuth } from '@okta/okta-react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles({
    root: {
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '20px'
    }
});

export default function LoginModal(props) {
    const classes = useStyles();
    const { authState, oktaAuth } = useOktaAuth();

    const handleClose = () => {
        props.closeLoginDialog()
    };

    const login = async () => oktaAuth.signInWithRedirect();
    const logout = async () => oktaAuth.signOut();

    return (
        <div>
            <Dialog
                open={props.openLoginDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }
                }}
                disableBackdropClick={true}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <img src={slimlogin} alt='' className="slim-login" />
                    </DialogContentText>
                </DialogContent>
                <DialogTitle id="alert-dialog-slide-title" className={classes.title}>
                    {"SLIM - Strategic Lifecycle Inventory Management"}
                </DialogTitle>
                <DialogActions className={classes.root}>
                    {!authState.isPending && !authState.isAuthenticated && (
                        <Form.Button fluid primary onClick={login}>LOGIN</Form.Button>
                    )}
                    {authState.isAuthenticated && (
                        <Form.Button fluid primary onClick={logout}>Logout</Form.Button>
                    )}
                </DialogActions>
            </Dialog>
        </div >
    );
}
