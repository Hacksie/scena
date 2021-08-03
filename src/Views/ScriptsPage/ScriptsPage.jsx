import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEditable } from 'use-editable';
import reactStringReplace from 'react-string-replace';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

import { Box, FormControl, Button, Grid, TextField, Select, InputLabel, Menu, MenuItem, Typography, Divider } from '@material-ui/core';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import SaveIcon from '@material-ui/icons/SaveOutlined';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

import { Navigation } from '../../App/Navigation';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { userActions } from '../../Components/User';

import raw from './sample2.txt';

const characters = [
    "VOICE OVER",
    "GREGORY",
    "SAMPSON",
    "ABRA",
    "BENVOLIO",
    "PETRUCHIO",
    "CAPULET",
    "DAVE",
    "GLORIA",
    "NURSE",
    "MERCUTIO",
    "TYBALT",
    "MONTAGUE",
    "ROMEO",
    "JULIET"
];


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        padding: theme.spacing(3),
        '& .MuiFormControl-root': {
            margin: theme.spacing(1),
        }
    },
    versionSelect: {
        width: '20vw'
    },
    toolbar: {
        //boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)'
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    scriptEditor: {
        display: 'flex',
        flexDirection: 'column',
        // marginTop: '1px',
        marginBottom: theme.spacing(1),
        border: `1px solid ${theme.palette.divider}`,
        //borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        marginTop: '64px',
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(1),
        },        
    },
    scriptText: {
        flexGrow: 1,
        margin: theme.spacing(1),
        height: '70vh !important',
        overflowY: 'scroll',
        overflowX: 'hidden',
        fontFamily: 'Courier',

        whiteSpace: 'pre',
        scrollbarWidth: 'thin',
    },
    scriptStatusbar: {
        flexGrow: 1,
        height: '24px',
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,

    },
    scriptLine: {

    },
    scriptCont: {
        fontStyle: 'italic',
        color: 'grey'
    },
    scriptInt: {
        fontWeight: '700',
    },
    scriptExt: {
        fontWeight: '700',
    },
    scriptStageDir: {
        fontWeight: '700',
    },
    scriptChar: {
        fontWeight: '700'
    }
}));

function renderCharacters(text, characters, line, classes) {

    for (let j = 0; j < characters.length; j++) {
        text = reactStringReplace(text, characters[j], (match, i) => (
            <span className={classes.scriptChar} style={{ color: `hsl(${j * 89 % 255}, 100%, 25%)` }} key={line + match + i}>{match}</span>
        ));
    }
    return text;
}

function renderLine(text, line, classes) {
    text = reactStringReplace(text, "CONTINUED", (match, i) => (
        <span className={classes.scriptCont} key={line + match + i}>CONTINUED</span>
    ));
    text = reactStringReplace(text, "(CONT'D)", (match, i) => (
        <span className={classes.scriptCont} key={line + match + i}>(CONT'D)</span>
    ));
    text = reactStringReplace(text, "(CONT’D)", (match, i) => (
        <span className={classes.scriptCont} key={line + match + i}>(CONT’D)</span>
    ));
    text = reactStringReplace(text, "(CONT.)", (match, i) => (
        <span className={classes.scriptCont} key={line + match + i}>(CONT’D)</span>
    ));    

    text = reactStringReplace(text, /^INT./, (match, i) => (
        <span className={classes.scriptInt} key={line + match + i}>INT.{match}</span>
    ));

    text = reactStringReplace(text, /^EXT./, (match, i) => (
        <span className={classes.scriptExt} key={line + match + i}>EXT.{match}</span>
    ));

    text = reactStringReplace(text, "CLOSE ON:", (match, i) => (
        <span className={classes.scriptStageDir} key={line + match + i}>{match}</span>
    ));

    text = reactStringReplace(text, "CUT TO:", (match, i) => (
        <span className={classes.scriptStageDir} key={line + match + i}>{match}</span>
    ));    
    text = reactStringReplace(text, "WIDE SHOT:", (match, i) => (
        <span className={classes.scriptStageDir} key={line + match + i}>{match}</span>
    ));        

    text = reactStringReplace(text, "TIGHT ON:", (match, i) => (
        <span className={classes.scriptStageDir} key={line + match + i}>{match}</span>
    ));        

    //WIDE SHOT:
    //TIGHT ON:

    return text;
}

function renderScript(text, classes) {
    //let render
    //return text.replace("CONTINUED:", "<b>CONTINUED:</b>");
    //<span style={{ color: `hsl(${((i % 20) * 17) | 0}, 80%, 50%)` }}></span>

    return text.split(/\r?\n/).map((content, i, arr) => (
        <div key={i} className={classes.scriptLine} >
            {renderCharacters(renderLine(content, i, classes), characters, i, classes)}
            {i < arr.length - 1 ? '\n' : null}
        </div>
    ))
}

function ScriptsPage() {

    const dispatch = useDispatch();

    const classes = useStyles();
    const theme = useTheme();
    //const text = useRef(raw);

    const [code, setCode] = useState(raw);
    const editorRef = useRef(null);

    useEditable(editorRef, setCode);


    return (
        <Box className={classes.root}>
            <Navigation route="scripts" />
            <Box className={classes.content}>
                <Box className={classes.scriptEditor}>
                <Grid container alignItems="center" className={classes.toolbar}>
                    <Button><SaveIcon /></Button>
                    <Divider orientation="vertical" flexItem />
                    <Button><ImageIcon /></Button>
                    <Button><VideocamOutlinedIcon /></Button>
                    <Button><ChatBubbleOutlineOutlinedIcon /></Button>
                    <Button><MoreHorizOutlinedIcon /></Button>
                    <Divider orientation="vertical" flexItem />
                    <Button><CloudUploadOutlinedIcon /></Button>
                    <Button><CloudDownloadOutlinedIcon /></Button>
                    {/* <FormControl>
                    <ImageIcon />
                    <Menu>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Menu>
                    </FormControl> */}
                </Grid>
                    {/* <ScrollSyncPane>
                            <Box className={classes.scriptLineNums}>
                                {renderLineNumbers(code, classes)}
                            </Box>
                        </ScrollSyncPane> */}
                    {/* <ScrollSyncPane> */}


                    <Box ref={editorRef} className={classes.scriptText}>
                        {renderScript(code, classes)}
                    </Box>
                    {/* </ScrollSyncPane> */}
                    <Box className={classes.scriptStatusbar}>
                        Status
                    </Box>
                </Box>


                {/* <Divider />
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                    Select a Script version
                </Typography>
                <FormControl className={classes.versionSelect}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        Version
                    </InputLabel>
                    <Select value={1}>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>
                </FormControl> */}
            </Box>
        </Box>
    );
}


export { ScriptsPage };