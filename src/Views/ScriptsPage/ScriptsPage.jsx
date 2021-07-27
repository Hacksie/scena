import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Navigation } from '../../App/Navigation';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { userActions } from '../../_actions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function ScriptsPage() {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <Box className={classes.root}>
            <Navigation route="scripts" />
            <Box className={classes.content}>
                <Typography variant="h1" component="h2" gutterBottom>
                    Scripts Page
                </Typography>
            </Box>
        </Box>
    );
}

export { ScriptsPage };