import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFirestoreConnect } from 'react-redux-firebase';
//import useFirestoreConnect from 'react-firebase';

import { Box, Button, IconButton, Typography, TextField, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import MovieIcon from '@material-ui/icons/MovieOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Navigation } from '../../App/Navigation';


import { productionsActions } from '../../Components/Production';
import { companyActions } from '../../Components/Company';
import { userActions } from '../../Components/User';


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
        '& .MuiFormControl-root': {
            margin: theme.spacing(1),
        }
    },
    title: {
        // fontSize: 14,
    },
    header: {
        background: '#ddd',
        padding: theme.spacing(3)
    },
    company: {
        // background: '#eee',
        padding: theme.spacing(3)
    },
    main: {
        padding: theme.spacing(3)
    }
}));

function HomePage(props) {

    //const auth = useSelector(state => state.firebase.auth);
    const profile = useSelector(state => state.firebase.profile);
    const productions = useSelector(state => state.productions);
    //const user = useSelector(state => state.authentication.user);

    const dispatch = useDispatch();
    const [showNewCompany, setShowNewCompany] = useState(false);
    const [showNewProduction, setShowNewProduction] = useState(false);
    const [showDeleteProduction, setShowDeleteProduction] = useState(false);
    const [selectedProduction, setSelectedProduction] = useState(profile && profile.selectedProduction ? profile.selectedProduction : '');
    const [selectedCompany, setSelectedCompany] = useState(profile && profile.selectedCompany ? profile.selectedCompany : '');
    const [inputs, setInputs] = useState({
        newCompanyTitle: '',
        newProductionTitle: ''
    });

    const auth = useSelector(({ firebase: { auth } }) => auth)
    const companies = useSelector(({ firestore: { data } }) => data.companies);

    useFirestoreConnect(() => [{ collection: 'companies', where: ['users', 'array-contains', auth && auth.uid ? auth.uid : ''] }])
    useFirestoreConnect(() => [{ collection: 'productions', where: ['users', 'array-contains', auth && auth.uid ? auth.uid : ''] }])



    const classes = useStyles();

    const toggleNewCompanyDialog = () => {
        setShowNewCompany(!showNewCompany);
    }

    const handleSelectCompany = (event) => {
        dispatch(userActions.selectCompany(event.target.value));
        setSelectedCompany(event.target.value);
    }

    const handleCreateCompany = () => {
        dispatch(companyActions.register({
            title: inputs.newCompanyTitle
        }))
        setShowNewCompany(false);
    }

    const toggleNewProductionDialog = () => {
        setShowNewProduction(!showNewProduction);
    }

    const toggleDeleteProductionDialog = () => {
        setShowDeleteProduction(!showDeleteProduction);
    }

    const handleCreateProduction = () => {
        dispatch(productionsActions.add({
            title: inputs.newProductionTitle
        }));
        setShowNew(false);
        dispatch(productionsActions.getAll());
    }

    const selectProduction = (id) => {
        setSelectedProduction(id);
        dispatch(productionsActions.getById(id));
    }

    const confirmDeleteProduction = (id) => {
        setSelectedProduction(id);
        toggleDeleteDialog();
    }

    const handleDeleteProduction = () => {
        dispatch(productionsActions.delete(selectedProduction));
        setShowDelete(false);
        //dispatch(productionsActions.getAll());
    }

    const handleInputs = (e) => {
        const { id, value } = e.target;
        setInputs(inputs => ({ ...inputs, [id]: value }));
    }

    return (
        <Box className={classes.root}>
            <Navigation route="home" />
            <Box className={classes.content}>
                <Box className={classes.header}>
                    <Typography variant="h1" component="h1" gutterBottom style={{ fontFamily: 'Satisfy' }}>
                        Scena.Studio
                    </Typography>
                    <Typography variant="h2" component="h2" gutterBottom>
                        Get Started
                    </Typography>
                </Box>
                {profile && companies && profile.selectedCompany && companies[profile.selectedCompany] &&
                    <Box className={classes.company}>
                        <Typography variant="h5" component="h5" gutterBottom>
                            Current Production Company - {companies[profile.selectedCompany].title}
                        </Typography>
                    </Box>
                }

                {profile &&
                    <Box className={classes.company}>
                        <Typography variant="h5" component="h5" gutterBottom>
                            Change Production Company
                        </Typography>
                        {companies &&
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Production Company</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={handleSelectCompany} value={selectedCompany ? selectedCompany : ''} >
                                    {Object.entries(companies).map((company, index) =>
                                        <MenuItem key={company[0]} value={company[0]}>{company[1].title}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        }
                        <Button variant="contained" color="primary" onClick={() => toggleNewCompanyDialog()}>Create a new Production Company</Button>
                    </Box>
                }
                <Dialog open={showNewCompany} onClose={() => toggleNewCompanyDialog()} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create A New Production Company</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the new company details
                        </DialogContentText>
                        <TextField autoFocus margin="dense" id="newCompanyTitle" label="Production Company Title" type="text" value={inputs.newCompanyTitle}
                            onChange={handleInputs} fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => toggleNewCompanyDialog()}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateCompany} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
                {profile && companies && productions && profile.selectedCompany && companies[profile.selectedCompany] &&
                    <React.Fragment>
                        <Box className={classes.main}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Change Production
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => toggleNewProductionDialog()}>Create a new Production</Button>
                            <Button variant="contained" color="secondary" onClick={() => confirmDeleteProduction(productions.production.id)} disabled={!(productions.production)}>Delete Production</Button>
                        </Box>
                        <Dialog open={showNewProduction} onClose={() => toggleNewProductionDialog()} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Create A New Production</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Enter the new production details
                                </DialogContentText>
                                <TextField autoFocus margin="dense" id="newProductionTitle" label="Production Title" type="text" value={inputs.newProductionTitle}
                                    onChange={handleInputs} fullWidth />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => toggleNewProductionDialog()}>
                                    Cancel
                                </Button>
                                <Button onClick={handleCreateProduction} color="primary">
                                    Create
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog open={showDeleteProduction} onClose={() => toggleDeleteProductionDialog()} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Delete Production?</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Confirm you want to delete production {selectedProduction}.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => toggleDeleteProductionDialog()}>
                                    Cancel
                                </Button>
                                <Button onClick={handleDeleteProduction} color="primary">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                }

                {/* 

                <Box className={classes.main}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Select A Production
                    </Typography>

                    {productions.loading && <em>Loading productions...</em>}
                    {productions.error && <span className="text-danger">ERROR: {productions.error}</span>}
                    {productions.items &&
                        <List dense={false}>
                            {productions.items.map((production, index) =>
                                <ListItem key={production.id} button onClick={() => selectProduction(production.id)} selected={productions && productions.production && production.id === productions.production.id}>
                                    <ListItemIcon>
                                        <MovieIcon />
                                    </ListItemIcon>
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
                    
                     
            </Box>*/}
            </Box>
        </Box >
    );
}

export { HomePage };