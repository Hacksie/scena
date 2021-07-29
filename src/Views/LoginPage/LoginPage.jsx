import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Container, Button, FormControl, Card, CardActions,CardContent,TextField, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { userActions } from '../../Components/User';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        }
    },
    title: {
        fontSize: 14,
    }
}));



function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    //const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    const classes = useStyles();
    const theme = useTheme();

    // reset login status
    useEffect(() => {
        //dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { id, value } = e.target;
        setInputs(inputs => ({ ...inputs, [id]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(username, password, from));
        }
    }

    return (
        <Box className={classes.content}>
            <Container maxWidth="sm">
            <Typography variant="h1" component="h1" gutterBottom>
                    Scena
                </Typography>
                <form name="form" onSubmit={handleSubmit}>
                    <Card>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Login
                            </Typography>
                            <FormControl fullWidth>
                                <TextField required id="username" name="username" label="Username" onChange={handleChange} value={username} variant="outlined"/>
                                {submitted && !username &&
                                    <div className="invalid-feedback">Username is required</div>
                                }
                            </FormControl>
                            <FormControl fullWidth>

                                <TextField required id="password" name="password" type="password" label="Password" onChange={handleChange} value={password} variant="outlined"/>
                                {submitted && !password &&
                                    <div className="invalid-feedback">Password is required</div>
                                }
                            </FormControl>

                        </CardContent>
                        <CardActions>
                            <Button variant="contained" type="submit" color="primary">Login</Button>
                            <Button variant="contained" component={Link} to='/register'>Register</Button>
                        </CardActions>
                    </Card>
                </form>
            </Container>
        </Box>
    );
}

export { LoginPage };