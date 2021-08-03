import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import { Box, FormControl, TextField, Button, List, ListItem, ListItemText, ListItemIcon, CardActions, CircularProgress } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/FaceOutlined';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Navigation } from '../../App/Navigation';

import { productionsActions } from '../../Components/Production';

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

function ProductionPage() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.firebase.profile);
    useFirestoreConnect(() => [{ collection: 'productions', doc: (profile && profile.selectedProduction ? profile.selectedProduction : '*'), storeAs: 'production' }])

    const production = useSelector(({ firestore: { data } }) => data.production);

    const classes = useStyles();
    const theme = useTheme();

    const [showNew, setShowNew] = useState(false);
    const [inputs, setInputs] = useState({
        title: production && production.title,
        character: ''
    });

    function handleInputs(e) {
        const { id, value } = e.target;
        setInputs(inputs => ({ ...inputs, [id]: value }));

    }

    useEffect(() => {
        setInputs({ title: production && production.title ? production.title : '' })
        //setCharacters(production && production.characters);
    }, [production]);

    const toggleNewDialog = () => {
        setShowNew(!showNew);
    }

    const handleUpdate = () => {
        const updatedProduction = {
            ...production,
            title: inputs.title
        };

        dispatch(productionsActions.update(profile.selectedProduction, updatedProduction));
    }

    const handleCreate = () => {
        const newCharacters = production && production.characters ? [...production.characters] : [];

        newCharacters.push({
            name: inputs.character
        });

        const updatedProduction = {
            ...production,
            characters: newCharacters
        };

        dispatch(productionsActions.update(profile.selectedProduction, updatedProduction));
        console.log(inputs.character);
        setShowNew(false);
    }

    const handleDelete = () => {
        dispatch(productionsActions.delete(selectedProduction));
        setShowDelete(false);
    }

    return (
        <Box className={classes.root}>
            <Navigation route="production" />
            <Box className={classes.content}>
                {!production &&
                    <CircularProgress />
                }
                {production &&
                    <React.Fragment>
                        <Box className={classes.card}>
                            <Typography className={classes.title} color="textPrimary" gutterBottom>
                                Production details
                            </Typography>
                            <FormControl fullWidth>
                                <TextField id="title" name="title" label="Production Title" value={inputs.title || ''} onChange={handleInputs} />
                            </FormControl>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={() => handleUpdate()}>Update Production</Button>
                                <Button variant="contained" onClick={() => handleDelete()}>Delete Production</Button>
                            </CardActions>
                        </Box>
                        <Box className={classes.card}>
                            <Typography className={classes.title} color="textPrimary" gutterBottom>
                                Characters
                            </Typography>
                            {production.characters && production.characters.length > 0 &&
                                <List>
                                    {production.characters.map((character, index) =>
                                        <ListItem key={index} button>
                                            <ListItemIcon>
                                                <FaceIcon />
                                            </ListItemIcon>
                                            <ListItemText>{character.name}</ListItemText>
                                        </ListItem>
                                    )}
                                </List>
                            }
                            {(!production.characters || production.characters.length == 0) &&
                                <Box>No characters</Box>
                            }
                            <CardActions>
                                <Button variant="contained" color="secondary" onClick={() => toggleNewDialog()}>Add a character</Button>
                            </CardActions>
                        </Box>
                    </React.Fragment>
                }
                <Dialog open={showNew} onClose={() => toggleNewDialog()} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add a character</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the new character
                        </DialogContentText>
                        <TextField autoFocus margin="dense" id="character" label="Name" type="text" value={inputs.character || ''}
                            onChange={handleInputs} fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={toggleNewDialog}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleCreate} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}

export { ProductionPage };