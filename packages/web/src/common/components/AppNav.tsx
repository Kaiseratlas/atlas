import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ReleasePicker from './ReleasePicker';

const AppNav: React.FC = () => {
  return (
    <AppBar sx={{ background: "black" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Kaiserreich Atlas
        </Typography>
        <ReleasePicker />
      </Toolbar>
    </AppBar>
  );
};

export default AppNav;
