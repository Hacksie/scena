import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import { IconButton, Button, Typography, Box, TextField, FormControl, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { Card, CardContent, CardActions } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Navigation } from '../../App/Navigation';


import { companyActions } from '../../Components/Company';
import { userActions } from '../../Components/User';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    title: {
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    content: {
        flexGrow: 1,
        '& .MuiFormControl-root': {
            margin: theme.spacing(0.5),
        }
    },
    card: {
        padding: theme.spacing(1),
        margin: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
    }
}));

function CompanyPage() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.firebase.profile);

    useFirestoreConnect(() => [{ collection: 'companies', doc: (profile && profile.selectedCompany ? profile.selectedCompany : '*'), storeAs: 'currentCompany' }])

    const company = useSelector(({ firestore: { data } }) => data.currentCompany);

    const [inputs, setInputs] = useState({
        companyTitle: '',
        companyLogo: ''
    });

    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        setInputs({ companyTitle: company && company.title })
    }, [company])


    function handleChange(e) {
        const { id, value } = e.target;
        setInputs(inputs => ({ ...inputs, [id]: value }));
    }

    const handleUpdateCompany = (id) => {
        dispatch(companyActions.update(profile.selectedCompany, { title: inputs.companyTitle }));
    }

    return (
        <Box className={classes.root}>
            <Navigation route="company" />
            <Box className={classes.content}>
                <Box className={classes.card}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Company
                    </Typography>
                    <FormControl fullWidth>
                        <TextField id="companyTitle" name="companyTitle" label="Company Title" onChange={handleChange} value={inputs.companyTitle || ''} />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField id="companyLogo" name="companyLogo" label="Company Logo" onChange={handleChange} value={inputs.companyLogo || ''} />
                    </FormControl>
                    <CardActions>
                        <Button variant="contained" onClick={() => handleUpdateCompany()} color="primary">Update</Button>
                    </CardActions>
                </Box>
            </Box>
        </Box>
    );
}

export { CompanyPage };