import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, FormControl, TextField, Card, CardContent, CardActions, Divider } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Navigation } from '../../App/Navigation';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    title: {
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    content: {
        flexGrow: 1,
        '& .MuiFormControl-root': {
            margin: theme.spacing(1),
        }
    },
    card: {
        padding: theme.spacing(1),
        margin: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
    }
}));


function AccountPage() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.firebase.profile);

    const [inputs, setInputs] = useState({
        displayName: profile && profile.displayName,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const classes = useStyles();

    useEffect(() => {
        setInputs({ ...inputs, displayName: profile.displayName })

    }, [profile])

    function handlePasswordChange(e) {
        const { id, value } = e.target;
        setInputs(inputs => ({ ...inputs, [id]: value }));
    }

    function handlePasswordSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (password) {
            //dispatch(userActions.login(username, password, from));
        }
    }

    return (
        <Box className={classes.root}>
            <Navigation route="account" />
            <Box className={classes.content}>
                <Box className={classes.card}>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Update Account Details
                    </Typography>
                    <FormControl fullWidth>
                        <TextField required id="displayName" name="displayName" label="Preferred Name" value={inputs.displayName || ''} />
                    </FormControl>
                    <Button variant="contained" type="submit" color="primary">Save Details</Button>
                </Box>
                <form name="form" onSubmit={handlePasswordSubmit}>
                    <Box className={classes.card}>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                            Update Password
                        </Typography>
                        <FormControl fullWidth>
                            <TextField required id="oldPassword" name="oldPassword" type="password" label="Old Password" onChange={handlePasswordChange} value={inputs.oldPassword} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField required id="newPassword" name="newPassword" type="password" label="New Password" onChange={handlePasswordChange} value={inputs.newPassword} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField required id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" onChange={handlePasswordChange} value={inputs.confirmPassword} />
                        </FormControl>
                        <Button variant="contained" type="submit" color="primary">Update Password</Button>
                    </Box>
                </form>
                <Box className={classes.card}>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Log out
                    </Typography>
                    <Button variant="contained" component={Link} to='/login'>Log out</Button>
                </Box>
            </Box>
        </Box>
    );
}

export { AccountPage };