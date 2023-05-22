import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop: any) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function TopMenu(props: any) {
    const router = useRouter()

    const handleLogout = async () => {

        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('username')
        localStorage.removeItem('roles')
        router.replace('/login');
    };

    return (
        <AppBar position="absolute" open={props.sideBarOpen}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.setSideBar}
                    sx={{
                        marginRight: '36px',
                        ...(props.sideBarOpen && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    {props.siteName}
                </Typography>
                <IconButton color="inherit" onClick={() => handleLogout()}>
                    <LogoutIcon />
                    <Typography variant='body1'>Logout</Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}