import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, CssBaseline, Grid, Paper, Toolbar } from '@mui/material';
import TopMenu from './TopMenu';
import MainMenu from './MainMenu';
import { useRouter } from 'next/router';
import React from 'react';

const mdTheme = createTheme();

export default function Layout(props: any) {
  console.log("Layout")

  const router = useRouter();
  const [sideBar, setSideBar] = React.useState(true);

  const [projectItem, setProjectItemOpen] = React.useState(router.route.split('/').at(1) === "projects");
  const [eventItem, setEventItemOpen] = React.useState(router.route.split('/').at(1) === "events");
  const [channelItem, setChannelItemOpen] = React.useState(router.route.split('/').at(1) === "channels");

  const handleSideBar = () => {
    setSideBar(!sideBar);
    if (sideBar) {
      setProjectItemOpen(false);
      setEventItemOpen(false);
      setChannelItemOpen(false);
    } else {
      setProjectItemOpen(router.route.split('/').at(1) === "projects");
      setEventItemOpen(router.route.split('/').at(1) === "events");
      setChannelItemOpen(router.route.split('/').at(1) === "channels");
    }
  }

  const handleProject = () => {
    setProjectItemOpen(!projectItem);
  }

  const handleEvent = () => {
    setEventItemOpen(!eventItem);
  }
  const handleChannel = () => {
    setChannelItemOpen(!channelItem);
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopMenu sideBarOpen={sideBar} setSideBar={handleSideBar} />
        <MainMenu sideBarOpen={sideBar} setSideBar={handleSideBar}
          projectItem={projectItem} handleProjectItem={handleProject}
          eventItem={eventItem} handleEventItem={handleEvent}
          channelItem={channelItem} handleChannelItem={handleChannel}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          {/* Recent Deposits */}
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}