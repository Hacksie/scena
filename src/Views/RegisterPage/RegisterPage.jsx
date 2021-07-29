import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Container, Button, Divider, FormControl, Card, CardActions, CardContent, TextField, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { companyActions } from '../../Components/Company';
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

function RegisterPage() {
    // const [user, setUser] = useState({
    //     name: '',
    //     preferredName: '',
    //     email: '',
    //     password: ''
    // });

    const [user, setUser] = useState({
        preferredName: '',
        email: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);
    //const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    const classes = useStyles();
    const theme = useTheme();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);



    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.preferredName && user.email && user.password) {
            dispatch(userActions.register(user));
            //dispatch(companyActions.register(company));
        }
    }

    return (
        <Box className={classes.content}>
            <Container maxWidth="sm">
                <Typography variant="h1" component="h1" gutterBottom>
                    Register
                </Typography>
                <form name="form" onSubmit={handleSubmit}>
                    <Card>
                        <CardContent>
                            <FormControl fullWidth>
                                <TextField required id="preferredName" name="preferredName" label="Preferred Name" onChange={handleChange} value={user.preferredName} />
                              </FormControl>
                            <FormControl fullWidth>
                                <TextField required id="email" name="email" label="Account Email" onChange={handleChange} value={user.email} />
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField required type="password" id="password" name="password" label="Password" onChange={handleChange} value={user.password} />
                              </FormControl>
                            {/* <Divider />
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Register New Company
                            </Typography>
                            <FormControl fullWidth>
                                <TextField required id="companyId" name="companyId" label="Unique Company Id" onChange={handleChange} value={company.companyId} />
                                {submitted && !companyId &&
                                    <div className="invalid-feedback">companyId is required</div>
                                }
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField required id="companyDisplayName" name="companyDisplayName" label="Company Title" onChange={handleChange} value={company.companyDisplayName} />
                                {submitted && !companyDisplayName &&
                                    <div className="invalid-feedback">companyDisplayName is required</div>
                                }
                            </FormControl> */}
                            
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" type="submit" color="primary">Register</Button>
                            <Button variant="contained" component={Link} to='/login'>Cancel</Button>
                        </CardActions>

                    </Card>
                </form>
            </Container>
        </Box>
    );
}

export { RegisterPage };