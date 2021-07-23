import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Container, Button, Divider, FormControl, Card, CardActions, CardContent, TextField, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { companyActions } from '../../_actions';
import { userActions } from '../../_actions';

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
    //     username: '',
    //     password: ''
    // });

    const [company, setCompany] = useState({
        companyId: '',
        companyDisplayName: '',
        name: '',
        preferredName: '',
        username: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    const classes = useStyles();
    const theme = useTheme();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);



    function handleChange(e) {
        const { name, value } = e.target;
        setCompany(company => ({ ...company, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (company.companyId && company.companyDisplayName && company.name && company.preferredName && company.username && company.password) {
            dispatch(companyActions.register(company));
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
                            </FormControl>
                            <Divider />
                            <FormControl fullWidth>
                                <TextField required id="name" name="name" label="Admin Name" onChange={handleChange} value={company.name} />
                                {submitted && !name &&
                                    <div className="invalid-feedback">Name is required</div>
                                }
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField required id="preferredName" name="preferredName" label="Admin Preferred Name" onChange={handleChange} value={company.preferredName} />
                                {submitted && !username &&
                                    <div className="invalid-feedback">Username is required</div>
                                }
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField required id="username" name="username" label="Admin Username" onChange={handleChange} value={company.username} />
                                {submitted && !username &&
                                    <div className="invalid-feedback">Username is required</div>
                                }
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField required type="password" id="password" name="password" label="Admin Password" onChange={handleChange} value={company.password} />
                                {submitted && !password &&
                                    <div className="invalid-feedback">Password is required</div>
                                }
                            </FormControl>
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