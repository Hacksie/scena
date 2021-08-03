import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useFirestoreConnect } from 'react-redux-firebase';
//import useFirestoreConnect from 'react-firebase';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import { Box, Button, IconButton, Typography, TextField, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Divider, CircularProgress } from '@material-ui/core';
import { Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import MovieIcon from '@material-ui/icons/MovieOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
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
        fontWeight:'700',
        textTransform:'uppercase'
    },
    header: {
        background: '#ddd',
        padding: theme.spacing(4)
    },
    company: {
        // background: '#eee',
        padding: theme.spacing(1),
        margin: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
        //padding: theme.spacing(1)
    },
    production: {
        padding: theme.spacing(1),
        margin: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
        //padding: theme.spacing(1)
    }
}));

function HomePage(props) {

    //const auth = useSelector(state => state.firebase.auth);
    const profile = useSelector(state => state.firebase.profile);
    //const productions = useSelector(state => state.productions);
    //const user = useSelector(state => state.authentication.user);

    const dispatch = useDispatch();
    const [showNewCompany, setShowNewCompany] = useState(false);
    const [showNewProduction, setShowNewProduction] = useState(false);
    const [showDeleteProduction, setShowDeleteProduction] = useState(false);
    const [deleteProduction, setDeleteProduction] = useState();


    const [inputs, setInputs] = useState({
        newCompanyTitle: '',
        newProductionTitle: ''
    });

    const auth = useSelector(({ firebase: { auth } }) => auth);
    const companies = useSelector(({ firestore: { data } }) => data.companies);
    const productions = useSelector(({ firestore: { data } }) => data.productions);

    useFirestoreConnect(() => [{ collection: 'companies', where: ['owner', '==', auth && auth.uid ? auth.uid : ''] }])
    useFirestoreConnect(() => [{ collection: 'productions', where: [['companyId', '==', profile && profile.selectedCompany ? profile.selectedCompany : ''], ['owner', '==', auth && auth.uid ? auth.uid : '']] }])

    const classes = useStyles();

    const toggleNewCompanyDialog = () => {
        setShowNewCompany(!showNewCompany);
    }

    const handleSelectCompany = (event) => {
        dispatch(userActions.selectCompany(event.target.value));
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
        }, profile.selectedCompany));
        setShowNewProduction(false);
    }

    const selectProduction = (id) => {
        dispatch(userActions.selectProduction(id));
    }

    const editProduction = (id) => {

    }

    /*

    const confirmDeleteProduction = (id) => {
        setDeleteProduction(id);
        toggleDeleteProductionDialog();
    }

    const handleDeleteProduction = () => {
        setShowDeleteProduction(!showDeleteProduction);
        if (deleteProduction === profile.selectedProduction) {
            dispatch(userActions.selectProduction(''));
        }
        dispatch(productionsActions.delete(deleteProduction));
    }*/

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
                {!isLoaded(profile) &&
                    <CircularProgress />
                }
                {profile &&
                    <React.Fragment>
                        <Box className={classes.company}>
                            <Typography className={classes.title} color="textPrimary" gutterBottom>
                                Select Production Company
                            </Typography>
                            {!isLoaded(companies) &&
                                <CircularProgress />
                            }                            
                            {companies &&
                                <FormControl fullWidth>
                                    <InputLabel>Production Company</InputLabel>
                                    <Select onChange={handleSelectCompany} value={profile.selectedCompany ? profile.selectedCompany : ''} >
                                        {Object.entries(companies).map((company, index) =>
                                            <MenuItem key={company[0]} value={company[0]}>{company[1].title}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            }
                            <Button color="primary" variant="contained" onClick={() => toggleNewCompanyDialog()}>New Production Company</Button>
                        </Box>
                        {companies && profile.selectedCompany && companies[profile.selectedCompany] &&
                            <Box className={classes.production}>
                                <Typography className={classes.title} color="textPrimary" gutterBottom>
                                    Select Production
                                </Typography>
                                {!isLoaded(productions) &&
                                    <CircularProgress />
                                }                                
                                {productions &&
                                    <List dense={false}>
                                        {Object.entries(productions).map((production, index) =>
                                            <ListItem key={production[0]} button onClick={() => selectProduction(production[0])} selected={profile && profile.selectedProduction && production[0] === profile.selectedProduction}>
                                                <ListItemIcon>
                                                    <MovieIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={production[1].title} />
                                                <ListItemSecondaryAction>
                                                {/* <IconButton edge="end" aria-label="edit"  onClick={() => confirmDeleteProduction(production[0])}> */}
                                                    <IconButton edge="end" aria-label="edit" component={Link} to={`/production/${production[0]}`}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )}
                                    </List>
                                }

                                {(isEmpty(productions)) && <Typography>No current productions</Typography>}

                                <Button color="primary" variant="contained" onClick={() => toggleNewProductionDialog()}>New Production</Button>
                                {/* <Button variant="contained" color="secondary" onClick={() => confirmDeleteProduction(deleteProduction)} disabled={!(deleteProduction)}>Delete Production</Button> */}
                            </Box>
                        }
                    </React.Fragment>
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
                        <Button variant="contained" onClick={() => toggleNewCompanyDialog()}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleCreateCompany} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
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
                        <Button variant="contained" onClick={() => toggleNewProductionDialog()}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleCreateProduction} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
{/*                 
                <Dialog open={showDeleteProduction} onClose={() => toggleDeleteProductionDialog()} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Delete Production?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Confirm you want to delete production {deleteProduction}.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={() => toggleDeleteProductionDialog()}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleDeleteProduction} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog> */}
            </Box>
        </Box >
    );
}

export { HomePage };