import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import PropTypes from 'prop-types';
import { AppBar, Drawer, Hidden, IconButton, Button, List, ListItem, ListItemIcon, Divider, Toolbar, Tooltip, Typography } from '@material-ui/core';
import MovieIcon from '@material-ui/icons/MovieOutlined';
import PermMediaIcon from '@material-ui/icons/PermMediaOutlined';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import GroupIcon from '@material-ui/icons/GroupOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircleOutlined';
import TheatersIcon from '@material-ui/icons/TheatersOutlined';
import MenuIcon from '@material-ui/icons/Menu';


import { PhotoAlbumOutlined } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Logo from '../Assets/logo.png'



const drawerWidth = 62;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        top: '50px',
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },

    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        backgroundColor: '#333',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        overflow: 'hidden',
        backgroundColor: '#444'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    logo: {
        boxShadow: 'none',
        backgroundColor: 'inherit',
        color: 'white',
        borderRadius: 0,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        marginTop: '1px',
        marginLeft: '1px',
        marginBottom: theme.spacing(5)
    },
    icon: {
        color: 'Gainsboro'
    }
}));



const Navigation = (props) => {

    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = useState(false);
    const profile = useSelector(({ firebase: { profile } }) => profile)
    const auth = useSelector(({ firebase: { auth } }) => auth);
    useFirestoreConnect(() => [{ collection: 'productions', doc: (profile && profile.selectedProduction ? profile.selectedProduction : '*'), storeAs:'navProduction' }])

    // , storeAs:'currentProductions'
    //,doc: (profile && profile.selectedProduction ? profile.selectedProduction : '')
    //where: [['companyId', '==', profile && profile.selectedCompany ? profile.selectedCompany : ''], ['users', 'array-contains', auth && auth.uid ? auth.uid : '']]
    const production = useSelector(({ firestore: { data } }) => data.navProduction);

    //const production = useSelector(state => state.productions.production);
    const container = window !== undefined ? () => window().document.body : undefined;

    useEffect(() => {

        document.title = production ? 'Scena - ' + production.title : 'Scena';
    });

    const drawer = (
        <div>
            {/* <div className={classes.toolbar} /> */}
            <Tooltip title="Scena.Studio">
                <Button variant='contained' component={Link} to="/" className={classes.logo}>
                    <img src={Logo} style={{ marginLeft: '-8px' }} />
                </Button>
            </Tooltip>
            <List>
                {profile && profile.selectedCompany && profile.selectedProduction && //profile.permissions.includes("canViewProduction") && production &&
                    <Tooltip title="Production">
                        <ListItem button key='Production' component={Link} to="/production" selected={props.route == 'production'}>
                            <ListItemIcon><MovieIcon className={classes.icon} /></ListItemIcon>
                        </ListItem>
                    </Tooltip>
                }
                {profile && profile.selectedCompany && profile.selectedProduction && //profile.permissions.includes("canViewScenes") && production &&
                    <Tooltip title="Scenes">
                        <ListItem button key='Scenes' component={Link} to="/scenes" selected={props.route == 'scenes'}>
                            <ListItemIcon><PermMediaIcon className={classes.icon} /></ListItemIcon>
                        </ListItem>
                    </Tooltip>
                }
                {profile && profile.selectedCompany && profile.selectedProduction && //profile.permissions.includes("canViewScripts") && production &&
                    <Tooltip title="Scripts">
                        <ListItem button key='Scripts' component={Link} to="/scripts" selected={props.route == 'scripts'}>
                            <ListItemIcon><AssignmentIcon className={classes.icon} /></ListItemIcon>
                        </ListItem>
                    </Tooltip>
                }
                {profile && profile.selectedCompany && profile.selectedProduction && //profile.permissions.includes("canViewTeam") && production &&
                    <Tooltip title="Team">
                        <ListItem button key='Team' component={Link} to="/team" selected={props.route == 'team'}>
                            <ListItemIcon><GroupIcon className={classes.icon} /></ListItemIcon>
                        </ListItem>
                    </Tooltip>
                }
                <Divider />
                {profile && profile.selectedCompany && //profile.permissions.includes("canViewCompany") &&
                    <Tooltip title="Production Company">
                        <ListItem button key='Company' component={Link} to="/company" selected={props.route == 'company'}>
                            <ListItemIcon><TheatersIcon className={classes.icon} /></ListItemIcon>
                        </ListItem>
                    </Tooltip>
                }
                <Tooltip title="Account">
                    <ListItem button key='Account' component={Link} to="/account" selected={props.route == 'account'}>
                        <ListItemIcon><AccountCircleIcon className={classes.icon} /></ListItemIcon>
                    </ListItem>
                </Tooltip>
            </List>
        </div>
    );

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" noWrap style={{ fontFamily: 'Satisfy' }}>
                        Scena.Studio
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{ paper: classes.drawerPaper }}
                        ModalProps={{ keepMounted: true }}>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent">
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

export { Navigation };