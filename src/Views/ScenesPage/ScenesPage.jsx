import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import { Box, Button, List, ListItem, ListItemSecondaryAction, ListItemIcon, ListItemText, CardActions, CircularProgress, Typography, FormControl, TextField } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutlined';
import SaveIcon from '@material-ui/icons/SaveOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Navigation } from '../../App/Navigation';

import { productionsActions } from '../../Components/Production';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        // height: '100vh',
        width: '100%',
        flexDirection: 'column',
        overflow: 'hidden',
        '& .MuiFormControl-root': {
            margin: theme.spacing(0.5),
        }
    },
    title: {
        fontWeight: '700',
        textTransform: 'uppercase'
    },    
    card: {
        padding: theme.spacing(1),
        margin: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
    },
    sceneListBox: {
        //boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
        //background: "#ccc",
        //background: '#ddd',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: '54px',
        height: '170px',
        overflowX: 'scroll',
        scrollbarWidth: 'thin',
        [theme.breakpoints.up('sm')]: {
            paddingTop: '4px',
            height: '120px',
        },
    },
    sceneList: {
        display: 'flex',
        flexDirection: 'row',
    },
    sceneView: {
        flexGrow: 1,
        //padding: theme.spacing(3),
        padding: theme.spacing(1),
        margin: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
    },
    sceneDetails: {
        paddingBottom: theme.spacing(3),
    },
    newSceneBox: {
        overflow: 'hidden',
        maxWidth: '160px',
        minWidth: '160px',
        justifyContent: 'center !important',
        textAlign: 'center',
        height: '90px',
        fontStyle: 'italic',
        color: '#333',
        border: `1px dashed ${theme.palette.divider}`,
        //borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        //boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    },
    sceneBox: {
        maxWidth: '160px',
        minWidth: '160px',
        marginRight: '2px',
        marginBottom: 'inherit',
        overflow: 'hidden',
        justifyContent: 'center !important',
        textAlign: 'center',
        height: '90px',
        border: `1px solid ${theme.palette.divider}`,
        //borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        //boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    },
    takeView: {
        flexGrow: 1,
        //marginTop: theme.spacing(1),
        //paddingBottom: theme.spacing(3),
        padding: theme.spacing(1),
        margin: theme.spacing(0.5),
        border: `1px solid ${theme.palette.divider}`,
    },
    takeListBox: {
        //background: "#ddd",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        height: '60px',
        overflowX: 'scroll',
        scrollbarWidth: 'thin',
        //boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    },
    takeList: {
        display: 'flex',
        flexDirection: 'row',
    },
    newTaskBox: {
        //backgroundColor: 'white',
        //border: "1px dashed #666",
        overflow: 'hidden',
        maxWidth: '160px',
        minWidth: '160px',
        justifyContent: 'center !important',
        textAlign: 'center',
        height: '34px',
        fontStyle: 'italic',
        border: `1px dashed ${theme.palette.divider}`,
        //borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        //boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    },
    taskBox: {
        //backgroundColor: 'white',
        maxWidth: '160px',
        minWidth: '160px',
        marginRight: '2px',
        // marginBottom: 'inherit',
        overflow: 'hidden',
        justifyContent: 'center !important',
        textAlign: 'center',
        height: '34px',
        border: `1px solid ${theme.palette.divider}`,
        //borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        //boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    }
}));

function ScenesPage() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.firebase.profile);
    useFirestoreConnect(() => [{ collection: 'productions', doc: (profile && profile.selectedProduction ? profile.selectedProduction : '*'), storeAs: 'production' }])

    const production = useSelector(({ firestore: { data } }) => data.production);

    const [currentScene, setCurrentScene] = useState();

    const classes = useStyles();
    const theme = useTheme();

    const handleNewScene = () => {
        const id = production && production.scenes && production.scenes.length ? Math.max(...production.scenes.map(x => x.id)) + 1 : 0;
        const newScene = {
            id: id,
            title: "unnamed scene " + (id + 1),
            takes: [],
            currentTake: 0
        }
        const newScenes = production.scenes ? [...production.scenes] : [];
        newScenes[id] = newScene;

        const updatedProduction = {
            ...production,
            scenes: newScenes
        };

        dispatch(productionsActions.update(profile.selectedProduction, updatedProduction));

        setCurrentScene(newScene);
    }

    const handleNewTake = () => {
        const id = currentScene.takes && currentScene.takes.length ? Math.max(...currentScene.takes.map(x => x.id)) + 1 : 0;
        const newTake = {
            id: id,
            title: "Take " + (id + 1)
        }
        const newTakes = currentScene.takes ? [...currentScene.takes] : [];
        newTakes[id] = newTake;
        const newScene = {
            ...currentScene,
            takes: newTakes,
            currentTake: id
        };

        setCurrentScene(newScene);
    }

    const selectScene = (id) => {
        setCurrentScene(production.scenes[id]);
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCurrentScene(currentScene => ({ ...currentScene, [id]: value }));
    }

    const handleUpdate = () => {
        const newScenes = [...production.scenes];
        newScenes[currentScene.id] = { ...currentScene }

        const updatedProduction = {
            ...production,
            scenes: newScenes
        };

        dispatch(productionsActions.update(profile.selectedProduction, updatedProduction));
    }

    return (
        <Box className={classes.root}>
            <Navigation route="scenes" />
            <Box className={classes.content}>
                {(!profile || !production) &&
                    <CircularProgress />
                }
                {(profile && production) &&
                    <React.Fragment>
                        <Box className={classes.sceneListBox}>
                            <List dense={false} className={classes.sceneList}>
                                {production.scenes &&
                                    production.scenes.map((scene, index) =>
                                        <ListItem key={scene.id} className={classes.sceneBox} button onClick={() => selectScene(scene.id)} selected={currentScene && scene.id === currentScene.id}>
                                            <ListItemText primary={scene.title} />
                                        </ListItem>
                                    )}
                                <ListItem key={-1} className={classes.newSceneBox} button onClick={() => handleNewScene()}><AddCircleOutlineIcon /></ListItem>
                            </List>
                        </Box>
                        {currentScene &&
                            <Box className={classes.sceneView}>
                                <Box className={classes.sceneDetails}>
                                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                                        Scene Details
                                    </Typography>
                                    <FormControl fullWidth>
                                        <TextField id="title" name="title" label="title" onChange={handleChange} value={currentScene && currentScene.title || ''} />
                                    </FormControl>
                                    <FormControl>
                                        <TextField id="title" name="title" label="lines start" onChange={handleChange} value={''} />
                                    </FormControl>
                                    <FormControl>
                                        <TextField id="title" name="title" label="lines end" onChange={handleChange} value={''} />
                                    </FormControl>
                                    <CardActions>
                                        <Button variant="contained" onClick={() => handleUpdate()} color="primary">Save Scene</Button>
                                    </CardActions>
                                </Box>
                                <Box className={classes.takeView}>
                                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                                        Continuity Log
                                    </Typography>
                                    <Box className={classes.takeListBox}>
                                        <List dense={false} className={classes.takeList}>
                                            {currentScene && currentScene.takes &&
                                                currentScene.takes.map((take, index) =>
                                                    <ListItem key={take.id} className={classes.taskBox} button onClick={() => handleNewTake()}>
                                                        {take.title}
                                                    </ListItem>
                                                )}
                                            <ListItem key={-1} className={classes.newTaskBox} button onClick={() => handleNewTake()}><AddCircleOutlineIcon /></ListItem>
                                        </List>
                                    </Box>
                                    {currentScene.takes && currentScene.currentTake > 0 &&
                                        <React.Fragment>
                                            <Box>
                                                <FormControl>
                                                    <TextField id="title" name="title" label="date" type="date" onChange={handleChange} />
                                                </FormControl>
                                                <FormControl>
                                                    <TextField id="title" name="title" label="time" type="time" onChange={handleChange} value={''} />
                                                </FormControl>
                                                <FormControl>
                                                    <TextField id="title" name="title" label="day" onChange={handleChange} value={''} />
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <FormControl>
                                                    <TextField id="title" name="title" label="location" onChange={handleChange} value={''} />
                                                </FormControl>
                                                <FormControl>
                                                    <TextField id="title" name="title" label="set" onChange={handleChange} value={''} />
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <FormControl>
                                                    <TextField id="title" name="title" label="roll" onChange={handleChange} value={''} />
                                                </FormControl>
                                                <FormControl>
                                                    <TextField id="title" name="title" label="shot type" onChange={handleChange} value={''} />
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <FormControl>
                                                    <TextField id="title" name="title" label="props" onChange={handleChange} value={''} />
                                                </FormControl>
                                                <FormControl>
                                                    <TextField id="title" name="title" label="dialogue" onChange={handleChange} value={''} />
                                                </FormControl>
                                                <FormControl>
                                                    <TextField id="title" name="title" label="costume" onChange={handleChange} value={''} />
                                                </FormControl>
                                            </Box>
                                            <Button variant="contained" onClick={() => handleUpdate()} color="primary">Save Take</Button>
                                        </React.Fragment>
                                    }
                                </Box>
                            </Box>
                        }
                    </React.Fragment>
                }
            </Box>
        </Box>
    );
}

export { ScenesPage };