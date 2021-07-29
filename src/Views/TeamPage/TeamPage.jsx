import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Typography, Box, TextField, FormControl, FormControlLabel, Checkbox, List, ListItem, ListItemSecondaryAction, ListItemIcon, ListItemText } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { productionsActions } from '../../Components/Production';
import { teamActions } from '../../Components/Team';

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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
    const dispatch = useDispatch();
    const production = useSelector(state => state.productions.production);
    const [showNew, setShowNew] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [inputs, setInputs] = useState({
        newMemberName: '',
        newMemberEmail: '',
        newMemberPhone: '',
        isCast: false,
        isCrew: false,
        castRoles: [],
        castRolesRaw: '',
        crewRoles: [],
        crewRolesRaw: '',
    });

    // const team = useSelector(state => state.team);
    // const user = useSelector(state => state.authentication.user);


    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        if (production) {
            dispatch(productionsActions.getById(production.id));
        }
    }, []);

    const toggleNewDialog = () => {
        setShowNew(!showNew);
    }

    const toggleDeleteDialog = () => {
        setShowDelete(!showDelete);
    }


    const handleInputs = (e) => {
        const { id, value } = e.target;
        setInputs(inputs => ({ ...inputs, [id]: value }));
    }


    const handleChecked = (e) => {
        const { id, checked } = e.target;
        setInputs({ ...inputs, [id]: checked });
    };

    const handleCreate = () => {

        const newTeam = production && production.team ? [...production.team] : [];

        newTeam.push({
            name: inputs.newMemberName,
            email: inputs.newMemberEmail,
            phone: inputs.newMemberPhone,
            castRoles: inputs.castRolesRaw ? inputs.castRolesRaw.split(",") : [],
            crewRoles: inputs.crewRolesRaw ? inputs.crewRolesRaw.split(",") : [],

        })
        const updatedProduction = {
            ...production,
            team: newTeam
        };

        dispatch(productionsActions.update(updatedProduction));
        setShowNew(false);
    }

    const handleDelete = () => {
        dispatch(productionsActions.delete(selectedProduction));
        setShowDelete(false);
        //dispatch(productionsActions.getAll());
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
                    {production && production.team &&
                        <List dense={false}>
                            {production.team.filter(x => x.castRoles && x.castRoles.length > 0).map((member, index) =>
                                <ListItem key={index} button>
                                    <ListItemText>{member.name} - {member.castRoles.join(",")}</ListItemText>
                                </ListItem>
                            )}
                        </List>
                    }

                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Crew
                    </Typography>
                    {production && production.team &&
                        <List dense={false}>
                            {production.team.filter(x => x.crewRoles && x.crewRoles.length > 0).map((member, index) =>
                                <ListItem key={index} button>
                                    <ListItemText>{member.name} - {member.crewRoles.join(",")}</ListItemText>
                                </ListItem>
                            )}
                        </List>
                    }


                    <Button variant="contained" onClick={() => toggleNewDialog()} color="primary">Add</Button>
                    <Button variant="contained" onClick={() => toggleNewDialog()} disabled>Delete</Button>

                    <Dialog open={showNew} onClose={() => toggleNewDialog()} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add a team member</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter the new production details
                            </DialogContentText>
                            <TextField autoFocus margin="dense" id="newMemberName" label="Name" type="text" value={inputs.newMemberName}
                                onChange={handleInputs} fullWidth />
                            <TextField autoFocus margin="dense" id="newMemberEmail" label="Email" type="text" value={inputs.newMemberEmail}
                                onChange={handleInputs} fullWidth />
                            <TextField autoFocus margin="dense" id="newMemberPhone" label="Phone" type="text" value={inputs.newMemberPhone}
                                onChange={handleInputs} fullWidth />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={inputs.isCast}
                                        onChange={handleChecked}
                                        name="isCast"
                                        id="isCast"
                                        color="primary"
                                    />
                                }
                                label="Cast"
                            />
                            {inputs.isCast &&
                                <TextField autoFocus margin="dense" id="castRolesRaw" label="Cast Roles" type="text" value={inputs.castRolesRaw}
                                    onChange={handleInputs} fullWidth />
                            }
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={inputs.isCrew}
                                        onChange={handleChecked}
                                        id="isCrew"
                                        name="isCrew"
                                        color="primary"
                                    />
                                }
                                label="Crew"
                            />
                            {inputs.isCrew &&
                                <TextField autoFocus margin="dense" id="crewRolesRaw" label="Crew Roles" type="text" value={inputs.crewRolesRaw}
                                    onChange={handleInputs} fullWidth />
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => toggleNewDialog()}>
                                Cancel
                            </Button>
                            <Button onClick={handleCreate} color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Box>
            </Box>
        </Box>
    );
}

export { TeamPage };