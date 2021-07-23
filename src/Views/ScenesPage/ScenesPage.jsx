import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, List, ListItem, ListItemSecondaryAction, ListItemIcon, ListItemText, IconButton, FormControl, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import DragIndicatorIcon from '@material-ui/icons/DragIndicatorOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Navigation } from '../../App/Navigation';

import { productionsActions } from '../../_actions';
import { ImportantDevices } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    },
    sceneListBox: {
        backgroundColor: '#ddd',
        padding: theme.spacing(3),
        paddingTop: '64px',
        height: '30vh',
        width: '100vw',
        overflowX: 'scroll',
        overflowY: 'hidden',
        [theme.breakpoints.up('sm')]: {
            width: '20vw',
            height: '100vh',
            overflowY: 'scroll',
            overflowX: 'hidden',
        },
    },
    sceneList: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'column',
        },
    },
    sceneView: {
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingTop: '64px',
        height: '100vh'
    },
    newSceneBox: {
        border: "1px dashed #666",
        borderRadius: '4px',
        overflow: 'hidden',
        // height: '10vh'
    },
    sceneBox: {
        border: "1px solid #666",
        borderRadius: '4px',
        // height: '10vh',
        marginRight: '4px',
        marginBottom: 'inherit',
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
            marginRight: 'inherit',
            marginBottom: '4px'
        },

    }
}));

function ScenesPage() {
    const production = useSelector(state => state.productions.production);
    const dispatch = useDispatch();
    const [currentScene, setCurrentScene] = useState({
        id:"",
        title:""
    })

    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        dispatch(productionsActions.getById(production.id));
        console.log('use effect');
        console.log(production.scenes);
        //setScenes(production.scenes);
    }, []);

    const handleNewScene = () => {
        const id = production.scenes.length ? Math.max(...production.scenes.map(x => x.id)) + 1 : 0;
        const newScene = {
            id: id,
            title: "unnamed scene " + (id + 1)
        }
        const newScenes = [...production.scenes];
        newScenes[id] = newScene;
        //setScenes(newScenes);

        const updatedProduction = {
            ...production,
            scenes: newScenes
        };

        dispatch(productionsActions.update(updatedProduction));

        setCurrentScene(newScene);
    }

    const selectScene = (id) => {
        console.log("select scene " + id);
        setCurrentScene(production.scenes[id]);
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        console.log(id, value);
        setCurrentScene(currentScene => ({ ...currentScene, [id]: value }));
    }

    const handleUpdate = () => {
        const newScenes = [...production.scenes];
        newScenes[currentScene.id] = {...currentScene}

        const updatedProduction = {
            ...production,
            scenes: newScenes
        };

        console.log('handle update scenes');
        console.log(updatedProduction);

        dispatch(productionsActions.update(updatedProduction));
        console.log(production);
    }


    return (
        <Box className={classes.root}>
            <Navigation route="scenes" />
            <Box className={classes.content}>
                <Box className={classes.sceneListBox}>
                    <List dense={false} className={classes.sceneList}>
                        {production && production.scenes &&
                            production.scenes.map((scene, index) =>
                                <ListItem key={scene.id} className={classes.sceneBox} button onClick={() => selectScene(scene.id)}>
                                    <ListItemText primary={scene.title} />
                                </ListItem>
                            )}
                        <ListItem key={-1} className={classes.newSceneBox} button onClick={() => handleNewScene()} >
                            <ListItemText primary='New Scene' />
                        </ListItem>
                    </List>
                    {/* <Button color="primary" variant="contained" className={classes.newSceneBox} onClick={() => handleNewScene()} fullWidth>New Scene</Button> */}

                </Box>
                <Box className={classes.sceneView}>
                    <FormControl fullWidth>
                        <TextField id="title" name="title" label="title" onChange={handleChange} value={currentScene.title || ''}/>
                    </FormControl>
                    <Button variant="contained" onClick={() => handleUpdate()} color="primary">Update</Button>
                </Box>
            </Box>
        </Box>
    );
}

export { ScenesPage };