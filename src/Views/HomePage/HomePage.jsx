import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, IconButton, Card, CardContent, CardActions, Typography, TextField, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Navigation } from '../../App/Navigation';

import { productionsActions } from '../../_actions';
import { companyActions } from '../../_actions';

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
    },
    title: {
        // fontSize: 14,
    },
    header: {
        background: '#ddd',
        padding: theme.spacing(3)
    },
    main: {
        padding: theme.spacing(3)
    }
}));

function HomePage(props) {
    const productions = useSelector(state => state.productions);
    const user = useSelector(state => state.authentication.user);
    const company = useSelector(state => state.company);
    const dispatch = useDispatch();
    const [showNew, setShowNew] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedProduction, setSelectedProduction] = useState();

    const [inputs, setInputs] = useState({
        newProductionTitle: ''
    });
    const classes = useStyles();

    const toggleNewDialog = () => {
        setShowNew(!showNew);
    }

    const toggleDeleteDialog = () => {
        setShowDelete(!showDelete);
    }

    const handleCreate = () => {
        dispatch(productionsActions.add({
            title: inputs.newProductionTitle
        }));
        setShowNew(false);
        dispatch(productionsActions.getAll());
    }

    const handleInputs = (e) => {
        const { id, value } = e.target;
        setInputs(inputs => ({ ...inputs, [id]: value }));
    }

    const selectProduction = (id) => {
        setSelectedProduction(id);
        dispatch(productionsActions.getById(id));
    }

    const confirmDeleteProduction = (id) => {
        setSelectedProduction(id);
        toggleDeleteDialog();
    }

    const handleDelete = () => {
        dispatch(productionsActions.delete(selectedProduction));
        setShowDelete(false);
        //dispatch(productionsActions.getAll());
    }    


    useEffect(() => {
        dispatch(companyActions.getById(user.companyId));
        dispatch(productionsActions.getAll());
    }, []);


    return (
        <Box className={classes.root}>
            <Navigation route="home" />
            <Box className={classes.content}>
                <Box className={classes.header}>
                <Typography variant="h1" component="h1" gutterBottom style={{fontFamily:'Satisfy'}}>
                        Scena.Studio
                    </Typography>
                    <Typography variant="h2" component="h2" gutterBottom>
                        {company.displayName}
                    </Typography>
                    <Typography variant="h3" component="h3" gutterBottom>
                        Get Started
                    </Typography>
                </Box>
                <Box className={classes.main}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Productions
                    </Typography>

                    {productions.loading && <em>Loading productions...</em>}
                    {productions.error && <span className="text-danger">ERROR: {productions.error}</span>}
                    {productions.items &&
                        <List dense={false}>
                            {productions.items.map((production, index) =>
                                <ListItem key={production.id} button onClick={() => selectProduction(production.id)}>
                                    <ListItemText primary={production.title} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={() => confirmDeleteProduction(production.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )}
                        </List>
                    }

                    <Button variant="contained" color="primary" onClick={() => toggleNewDialog()}>Create a new Production</Button>

                    <Dialog open={showNew} onClose={() => toggleNewDialog()} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create A New Production</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter the new production details
                            </DialogContentText>
                            <TextField autoFocus margin="dense" id="newProductionTitle" label="Production Title" type="text" value={inputs.newProductionTitle}
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

                    <Dialog open={showDelete} onClose={() => toggleDeleteDialog()} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Delete Production?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Confirm you want to delete production {selectedProduction}.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => toggleDeleteDialog()}>
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} color="primary">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>                    
                </Box>
            </Box>
        </Box>
    );
}

export { HomePage };