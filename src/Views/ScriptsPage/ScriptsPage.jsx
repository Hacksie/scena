import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, FormControl, TextField, Select, InputLabel, MenuItem } from '@material-ui/core';
import { Navigation } from '../../App/Navigation';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { userActions } from '../../_actions';

import raw from './sample.txt';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        padding: theme.spacing(3),
        '& .MuiTextField-root': {
            marginTop: theme.spacing(3),
        }
    },
    versionSelect: {
        width: '20vw'
    },
    scriptText: {
        marginTop: theme.spacing(3),
        height: '70vh !important',
        overflowY: 'scroll',
        fontFamily: 'Courier',
        border:'1px solid #999',
        whiteSpace: 'pre-line',

    }
}));

function ScriptsPage() {
    
    const dispatch = useDispatch();

    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {

    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <Box className={classes.root}>
            <Navigation route="scripts" />
            <Box className={classes.content}>
                <FormControl className={classes.versionSelect}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        Version
                    </InputLabel>
                    <Select value={1}>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>
                </FormControl>
                <div contentEditable={true} className={classes.scriptText}>
                    {raw}
                </div>
                {/* <FormControl fullWidth>
                    <TextField id="title" name="title"  label="script" type="text" multiline variant="outlined"/>
                </FormControl> */}
            </Box>
        </Box>
    );
}


export { ScriptsPage };