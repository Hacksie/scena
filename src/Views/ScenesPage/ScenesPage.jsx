import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, List, ListItem, ListItemSecondaryAction, ListItemIcon, ListItemText, IconButton, Typography, FormControl, TextField } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutlined';
import SaveIcon from '@material-ui/icons/SaveOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Navigation } from '../../App/Navigation';

import { productionsActions } from '../../_actions';

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
        '& .MuiTextField-root': {
            margin: '1px',
        }
    },
    sceneListBox: {
        background: "#ccc",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: '54px',
        height: '180px',
        overflowX: 'auto',
        [theme.breakpoints.up('sm')]: {
            paddingTop: '4px',
            height: '130px',
        },
    },
    sceneList: {
        display: 'flex',
        flexDirection: 'row',
    },
    sceneView: {
        flexGrow: 1,
        padding: theme.spacing(3),
        // paddingTop: '64px',
    },
    logView: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        // paddingTop: '64px',
    },
    newSceneBox: {
        backgroundColor: '#eee',
        border: "1px dashed #666",
        overflow: 'hidden',
        maxWidth: '160px',
        minWidth: '160px',
        justifyContent: 'center !important',
        textAlign: 'center',
        height: '90px'
    },
    sceneBox: {
        backgroundColor: 'white',
        maxWidth: '160px',
        minWidth: '160px',
        marginRight: '4px',
        marginBottom: 'inherit',
        overflow: 'hidden',
        justifyContent: 'center !important',
        textAlign: 'center',
        height: '90px'
    },
    logListBox: {
        background: "#ddd",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        // paddingLeft: theme.spacing(1),
        // paddingRight: theme.spacing(1),
        // paddingTop: theme.spacing(1),
        height: '70px',
        overflowX: 'scroll',
        // [theme.breakpoints.up('sm')]: {
        //     paddingTop: '14px',
        // },
    },
    logList: {
        display: 'flex',
        flexDirection: 'row',
    },
    newTaskBox: {
        backgroundColor: 'white',
        border: "1px dashed #666",
        overflow: 'hidden',
        maxWidth: '160px',
        minWidth: '160px',
        justifyContent: 'center !important',
        textAlign: 'center',
        height: '34px'
    },
    taskBox: {
        backgroundColor: 'white',
        maxWidth: '160px',
        minWidth: '160px',
        marginRight: '4px',
        // marginBottom: 'inherit',
        overflow: 'hidden',
        justifyContent: 'center !important',
        textAlign: 'center',
        height: '34px'
    }
}));

function ScenesPage() {
    const production = useSelector(state => state.productions.production);
    const dispatch = useDispatch();
    const [currentScene, setCurrentScene] = useState({
        id: "",
        title: "",
        logs: [],
        currentLog: 0
    })

    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        dispatch(productionsActions.getById(production.id));
    }, []);

    const handleNewScene = () => {
        const id = production && production.scenes && production.scenes.length ? Math.max(...production.scenes.map(x => x.id)) + 1 : 0;
        const newScene = {
            id: id,
            title: "unnamed scene " + (id + 1),
            logs: [],
            currentLog: 0
        }
        const newScenes = production.scenes ? [...production.scenes] : [];
        newScenes[id] = newScene;

        const updatedProduction = {
            ...production,
            scenes: newScenes
        };

        dispatch(productionsActions.update(updatedProduction));

        setCurrentScene(newScene);
    }

    const handleNewLog = () => {
        console.log('new log');
        const id = currentScene.logs && currentScene.logs.length ? Math.max(...currentScene.logs.map(x => x.id)) + 1 : 0;
        const newLog = {
            id: id,
            title: "Log " + (id + 1)
        }
        const newLogs = currentScene.logs ? [...currentScene.logs] : [];
        newLogs[id] = newLog;
        const newScene = {
            ...currentScene,
            logs: newLogs,
            currentLog: id
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

        dispatch(productionsActions.update(updatedProduction));
    }

    return (
        <Box className={classes.root}>
            <Navigation route="scenes" />
            <Box className={classes.content}>
                <Box className={classes.sceneListBox}>
                    <List dense={false} className={classes.sceneList}>
                        {production && production.scenes &&
                            production.scenes.map((scene, index) =>
                                <ListItem key={scene.id} className={classes.sceneBox} button onClick={() => selectScene(scene.id)} selected={currentScene && scene.id === currentScene.id}>
                                    <ListItemText primary={scene.title} />
                                </ListItem>
                            )}
                        <ListItem key={-1} className={classes.newSceneBox} button onClick={() => handleNewScene()} >
                            New Scene <AddCircleOutlineIcon />
                        </ListItem>
                    </List>
                </Box>
                <Box className={classes.sceneView}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Scene Details
                    </Typography>
                    <FormControl fullWidth>
                        <TextField id="title" name="title" label="title" onChange={handleChange} value={currentScene && currentScene.title || ''} />
                    </FormControl>
                    <Box className={classes.logView}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Continuity Log
                        </Typography>

                        <Box className={classes.logListBox}>
                            <List dense={false} className={classes.logList}>
                                {currentScene && currentScene.logs &&
                                    currentScene.logs.map((log, index) =>
                                        <ListItem key={log.id} className={classes.taskBox} button onClick={() => handleNewLog()} >
                                            {log.title}
                                        </ListItem>
                                    )}
                                <ListItem key={-1} className={classes.newTaskBox} button onClick={() => handleNewLog()} >
                                    New Log <AddCircleOutlineIcon />
                                </ListItem>
                            </List>
                        </Box>
                        {currentScene.logs &&
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
                            </React.Fragment>
                        }
                        
                    </Box>
                    <IconButton variant="contained" onClick={() => handleUpdate()} color="primary"><SaveIcon /></IconButton>
                </Box>
            </Box>
        </Box>
    );
}

export { ScenesPage };