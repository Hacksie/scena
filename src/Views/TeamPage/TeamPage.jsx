import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Card, CardContent, CardActions, Button, Typography, Box } from '@material-ui/core';
import { Navigation } from '../../App/Navigation';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { userActions } from '../../_actions';
import { teamActions } from '../../_actions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        // fontSize: 14,
    },
    card: {
        marginBottom: theme.spacing(3)
    }
}));

function TeamPage() {
    const team = useSelector(state => state.team);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        console.log("effect");
        dispatch(teamActions.getAll());
    }, []);

    function handleAddCastMember() {
        const member = {
            id: 1,
            name: 'ben wise',
            roles: ['cast']

        }
        dispatch(teamActions.add(member));
    }

    function handleAddCrewMember() {
        const member = {
            id: 1,
            name: 'ben wise',
            roles: ['crew']

        }
        dispatch(teamActions.add(member));
    }

    return (
        <Box className={classes.root}>
            <Navigation route="team" />
            <Box className={classes.content}>
                <Typography variant="h1" component="h2" gutterBottom>Team</Typography>
                <Box className={classes.card}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Cast
                    </Typography>

                    {team.loading && <em>Loading team...</em>}
                    {team.error && <span className="text-danger">ERROR: {team.error}</span>}
                    {team.items &&
                        <ul>
                            {team.items.map((member, index) =>
                                <li key={member.id}>
                                    {member.name}
                                    {
                                        member.deleting ? <em> - Deleting...</em>
                                            : member.deleteError ? <span className="text-danger"> - ERROR: {member.deleteError}</span>
                                                : <span> - <a onClick={() => handleDeleteUser(member.id)} className="text-primary">Delete</a></span>
                                    }
                                </li>
                            )}
                        </ul>
                    }



                    <Button variant="contained" onClick={() => handleAddCastMember()} color="primary">Add</Button>
                    <Button variant="contained" component={Link} to='/register' disabled>Delete</Button>
                </Box>
                <Box className={classes.card}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Crew
                    </Typography>

                    <Button variant="contained" onClick={() => handleAddCrewMember()} color="primary">Add</Button>
                    <Button variant="contained" component={Link} to='/register' disabled>Delete</Button>

                </Box>
            </Box>
        </Box>
    );
}

export { TeamPage };