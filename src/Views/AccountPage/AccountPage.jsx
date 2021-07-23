import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Card, CardContent, CardActions, Button, Typography, FormControl, TextField } from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Navigation } from '../../App/Navigation';

import { userActions } from '../../_actions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        }
    },
    card: {
        marginBottom: theme.spacing(3)
    }
}));



function AccountPage() {
    const [inputs, setInputs] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const { oldPassword, newPassword, confirmPassword } = inputs;

    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const classes = useStyles();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

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
                <Typography variant="h1" component="h1" gutterBottom>
                    Account Settings
                </Typography>
                <Box className={classes.card}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Update Account Details
                    </Typography>
                    <FormControl fullWidth>
                        <TextField required id="name" name="name" label="Name" value={user.name} />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField required id="preferredName" name="preferredName" label="Preferred Name" value={user.preferredName} />
                    </FormControl>

                    <Button variant="contained" type="submit" color="primary">Save Details</Button>
                </Box>
                <Box className={classes.card}>
                    <form name="form" onSubmit={handlePasswordSubmit}>

                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Update Password
                        </Typography>
                        <FormControl fullWidth>
                            <TextField required id="oldPassword" name="oldPassword" type="password" label="Old Password" onChange={handlePasswordChange} value={oldPassword} variant="outlined" />
                            {/* {submitted && !password &&
                                <div className="invalid-feedback">Password is required</div>
                            } */}
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField required id="newPassword" name="newPassword" type="password" label="New Password" onChange={handlePasswordChange} value={newPassword} variant="outlined" />
                            {/* {submitted && !password &&
                                <div className="invalid-feedback">Password is required</div>
                            } */}
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField required id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" onChange={handlePasswordChange} value={confirmPassword} variant="outlined" />
                            {/* {submitted && !password &&
                                <div className="invalid-feedback">Password is required</div>
                            } */}
                        </FormControl>

                        <Button variant="contained" type="submit" color="primary">Update Password</Button>

                    </form>
                </Box>
                <Button variant="contained" component={Link} to='/login'>Logout</Button>

            </Box>
        </Box>
    );
}

export { AccountPage };