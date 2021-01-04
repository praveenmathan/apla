import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    message: {
        display: 'flex',
        fontSize: '15px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    success: {
        backgroundColor: '#2ecc71'
    },
    error: {
        backgroundColor: '#c0392b'
    }
}));

function CustomSnackbar({ status, msg }) {
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();

    /* Initiating based on the status */
    useEffect(
        () => {
            setOpen(true);
        },
        [status, msg]
    );

    /* Handle Close in snack bar */
    function handleClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    }

    /* Slide Transition */
    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
        >
            <SnackbarContent
                className={status === 'success' ? classes.success : classes.error}
                status={status}
                contentprops={{
                    "aria-describedby": "message-id"
                }}
                message={(
                    <div className={classes.message} id='message-id'>
                        {status === 'success' ? <CheckCircleIcon style={{ margin: 10 }} /> : <ErrorIcon style={{ margin: 10 }} />}
                        {msg || `Status: ${status}`}
                    </div>
                )}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </Snackbar>
    );
}
export default CustomSnackbar;
