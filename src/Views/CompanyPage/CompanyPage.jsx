import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Card, CardContent, CardActions,IconButton,Button, Typography, Box, TextField, FormControl, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Navigation } from '../../App/Navigation';



import { companyActions, userActions } from '../../_actions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        }
    },
    title: {
        // fontSize: 14,
    },
    card: {
        margin: theme.spacing(3)
    }
}));

function CompanyPage() {
    const user = useSelector(state => state.authentication.user);
    const users = useSelector(state => state.users);
    const company = useSelector(state => state.company);

    const dispatch = useDispatch();

    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        dispatch(companyActions.getById(user.companyId));
    }, []);

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleChange(e) {
        // const member = {
        //     id: 1,
        //     name: 'ben wise',
        //     roles: ['cast']

        // }
        // dispatch(teamActions.add(member));
    }


    return (
        <Box className={classes.root}>
            <Navigation route="company" />
            <Box className={classes.content}>
                <Box className={classes.card}>

                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Company
                        </Typography>
                        <FormControl fullWidth>
                            <TextField id="companyId" name="companyId" label="Company Id" onChange={handleChange} value={company.id || ''} disabled />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="companyDisplayName" name="companyDisplayName" label="Company Title" onChange={handleChange} value={company.displayName || ''} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="companyLogo" name="companyLogo" label="Company Logo" onChange={handleChange} value={company.logo || ''} />
                        </FormControl>
                        <Button variant="contained" onClick={() => handleAddCastMember()} color="primary">Update</Button>
                </Box>
                <Box className={classes.card}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Users
                        </Typography>

                        {users.loading && <em>Loading users...</em>}
                        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                        {users.items &&

                            <List dense={false}>
                                {users.items.map((user, index) =>
                                    <ListItem key={user.id} button>
                                        <ListItemText primary={user.name}/>
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )}
                            </List>
                        }

                        {/* {users.loading && <em>Loading users...</em>}
                        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                        {users.items &&
                            <ul>
                                {users.items.map((user, index) =>
                                    <li key={user.id}>
                                        {user.name}
                                        {
                                            user.deleting ? <em> - Deleting...</em>
                                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                    : <span> - <Button>Delete</Button> <a onClick={() => handleDeleteUser(user.id)} className="text-primary">Delete</a></span>
                                        }
                                    </li>
                                )}
                            </ul>
                        } */}
                </Box>
            </Box>
        </Box>
    );
}

export { CompanyPage };