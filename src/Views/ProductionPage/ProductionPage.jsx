import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, FormControl, TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Navigation } from '../../App/Navigation';

import { productionsActions } from '../../Components/Production';

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
}));



function ProductionPage() {
    const production = useSelector(state => state.productions.production);
    const dispatch = useDispatch();

    const classes = useStyles();
    const theme = useTheme();

    const [showNew, setShowNew] = useState(false);
    const [inputs, setInputs] = useState({
        title: production.title,
        character: ''
    });

    function handleInputs(e) {
        const { id, value } = e.target;
        setInputs(inputs => ({ ...inputs, [id]: value }));

    }

    useEffect(() => {
        dispatch(productionsActions.getById(production.id));
    }, []);

    const toggleNewDialog = () => {
        setShowNew(!showNew);
    }

    const handleUpdate = () => {
        const updatedProduction = {
            ...production,
            title: inputs.title
        };

        dispatch(productionsActions.update(updatedProduction));
        //dispatch(productionsActions.getAll());
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

        dispatch(productionsActions.update(updatedProduction));
        console.log(inputs.character);
        setShowNew(false);
    }

    const handleDelete = () => {
        dispatch(productionsActions.delete(selectedProduction));
        setShowDelete(false);
        //dispatch(productionsActions.getAll());
    }

    return (
        <Box className={classes.root}>
            <Navigation route="production" />
            <Box className={classes.content}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Production details
                </Typography>
                <FormControl fullWidth>
                    <TextField id="title" name="title" label="Production Title" value={inputs.title || ''} onChange={handleInputs} />
                </FormControl>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Characters
                </Typography>
                {production && production.characters &&
                    <List>
                        {production.characters.map((character, index) =>
                            <ListItem key={index} button>
                                <ListItemText>{character.name}</ListItemText>
                            </ListItem>
                        )}
                    </List>
                }
                <Dialog open={showNew} onClose={() => toggleNewDialog()} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add a team member</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the new character
                        </DialogContentText>
                        <TextField autoFocus margin="dense" id="character" label="Name" type="text" value={inputs.character}
                            onChange={handleInputs} fullWidth />
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
                <Button variant="contained" color="secondary" onClick={() => toggleNewDialog()}>Add a character</Button>
                <Button variant="contained" color="primary" onClick={() => handleUpdate()}>Update Production</Button>
                <Button variant="contained" onClick={() => handleDelete()}>Delete Production</Button>
            </Box>
        </Box>
    );
}

export { ProductionPage };