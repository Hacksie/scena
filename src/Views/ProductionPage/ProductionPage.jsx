import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {Box, FormControl, TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Navigation } from '../../App/Navigation';

import { productionsActions } from '../../_actions';

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

    const [inputs, setInputs] = useState({
        title: production.title
    });

    function handleInputs(e) {
        const { id, value } = e.target;
        setInputs(inputs => ({ ...inputs, [id]: value }));
        
    }

    useEffect(() => {
         dispatch(productionsActions.getById(production.id));
    }, []);

    const handleUpdate = () => {
        const updatedProduction = {
            ...production,
            title: inputs.title
        };

        console.log('handle update');
        console.log(updatedProduction);

        dispatch(productionsActions.update(updatedProduction));
        //dispatch(productionsActions.getAll());
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
                <Typography variant="h1" component="h2" gutterBottom>
                    Production
                </Typography>
                <FormControl fullWidth>
                    <TextField id="id" name="id" label="Production Id" value={production.id || ''} disabled/>
                </FormControl>                
                <FormControl fullWidth>
                    <TextField id="title" name="title" label="Production Title" value={inputs.title || ''} onChange={handleInputs}/>
                </FormControl>
                <Button variant="contained" color="primary" onClick={() => handleUpdate()}>Update</Button>
                <Button variant="contained" onClick={() => handleDelete()}>Delete</Button>
            </Box>
        </Box>
    );
}

export { ProductionPage };