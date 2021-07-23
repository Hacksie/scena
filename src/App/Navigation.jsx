import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { IconButton, Button } from '@material-ui/core';
import MovieIcon from '@material-ui/icons/MovieOutlined';
import PermMediaIcon from '@material-ui/icons/PermMediaOutlined';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import GroupIcon from '@material-ui/icons/GroupOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircleOutlined';
import TheatersIcon from '@material-ui/icons/TheatersOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { List, ListItem, ListItemIcon, Divider } from '@material-ui/core';

import { PhotoAlbumOutlined } from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
        boxShadow:'none',
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
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const user = useSelector(state => state.authentication.user);
    const production = useSelector(state => state.productions.production);
    const container = window !== undefined ? () => window().document.body : undefined;

    useEffect(() => {
        document.title = production ? 'Scena - ' + production.title : 'Scena';
    });

    const drawer = (
        <div>
            <div className={classes.toolbar} />

            <Button variant='contained' component={Link} to="/" className={classes.logo}>
                <img src={Logo} style={{ marginLeft: '-8px' }} />
            </Button>
            <List>
                {user && user.permissions.includes("canViewScenes") && production &&
                    <ListItem button key='Scenes' component={Link} to="/scenes" selected={props.route == 'scenes'}>
                        <ListItemIcon><PermMediaIcon className={classes.icon} /></ListItemIcon>
                    </ListItem>
                }
                {user && user.permissions.includes("canViewScripts") && production &&
                    <ListItem button key='Scripts' component={Link} to="/scripts" selected={props.route == 'scripts'}>
                        <ListItemIcon><AssignmentIcon className={classes.icon} /></ListItemIcon>
                    </ListItem>
                }
                {user && user.permissions.includes("canViewProduction") && production &&
                    <ListItem button key='Production' component={Link} to="/production" selected={props.route == 'production'}>
                        <ListItemIcon><MovieIcon className={classes.icon} /></ListItemIcon>
                    </ListItem>
                }
                {user && user.permissions.includes("canViewTeam") && production &&
                    <ListItem button key='Team' component={Link} to="/team" selected={props.route == 'team'}>
                        <ListItemIcon><GroupIcon className={classes.icon} /></ListItemIcon>
                    </ListItem>
                }
                
                {/* <ListItem button key='Settings' component={Link} to="/settings" selected={props.route == 'settings'}>
                    <ListItemIcon><SettingsIcon className={classes.icon} /></ListItemIcon>
                </ListItem> */}
                <Divider />
                {user && user.permissions.includes("canViewCompany") &&
                    <ListItem button key='Company' component={Link} to="/company" selected={props.route == 'company'}>
                        <ListItemIcon><TheatersIcon className={classes.icon} /></ListItemIcon>
                    </ListItem>
                }
                <ListItem button key='Account' component={Link} to="/account" selected={props.route == 'account'}>
                    <ListItemIcon><AccountCircleIcon className={classes.icon} /></ListItemIcon>
                </ListItem>
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