import React from 'react';
import { AppBar, Box, CssBaseline, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <AppBar
        sx={(theme) => ({
          position: 'relative',
          zIndex: theme.zIndex.drawer + 1,
        })}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;
