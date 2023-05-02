import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Stack } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

const drawerWidth = 300;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function MainMenu(props: any) {

    return (
        <Drawer variant="permanent" open={props.sideBarOpen}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={props.setSideBar}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="stretch"
                spacing={2}
                height={'100%'}
            >
                <Box>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <ListItemButton onClick={props.handleProjectItem}>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Project" />
                            {props.projectItem ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={props.projectItem} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }} href="/projects/projects">
                                    <ListItemIcon>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Projects" />
                                </ListItemButton>
                            </List>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }} href="/projects/tasks">
                                    <ListItemIcon>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Tasks" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>

                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <ListItemButton onClick={props.handleChannelItem}>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Channels" />
                            {props.channelItem ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={props.channelItem} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }} href="/channels/channels">
                                    <ListItemIcon>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Channels" />
                                </ListItemButton>
                            </List>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }} href="/channels/posts">
                                    <ListItemIcon>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Posts" />
                                </ListItemButton>
                            </List>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }} href="/channels/audiences">
                                    <ListItemIcon>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Audiences" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>

                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <List component="div" disablePadding>
                            <ListItemButton href="/events">
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Events" />
                            </ListItemButton>
                        </List>
                    </List>
                </Box>
                <Box>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <List component="div" disablePadding>
                            <ListItemButton href="/settings/users">
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Users settings" />
                            </ListItemButton>
                        </List>
                    </List>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <List component="div" disablePadding>
                            <ListItemButton href="/settings/labels">
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Labels a settings" />
                            </ListItemButton>
                        </List>
                    </List>

                </Box>
            </Stack>
        </Drawer>
    )
}