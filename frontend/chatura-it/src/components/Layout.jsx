import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Tab,
  Tabs,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  Box,
  Popover,
  Avatar
} from "@mui/material";
import {
  Menu,
  Home,
  People,
  School,
  Person,
  ExitToApp,
} from "@mui/icons-material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import TrophyIcon from "@mui/icons-material/EmojiEvents";
import { useHistory, useLocation } from "react-router-dom";
import SchoolIcon from '@mui/icons-material/School';
import Logo from "./Logo";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffd633",
    },
  },
});

const Layout = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const history = useHistory();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation(); // Use the useLocation hook

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (route) => {
    history.push(route);
    setDrawerOpen(false);
  };

  useEffect(() => {
    setUserInfo(localStorage.getItem("user-data"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-data");
    window.location.href = "/login";
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="h1" style={{ flexGrow: 1 }}>
              <Logo/>
            </Typography>
            {isMediumScreen ? (
              <IconButton color="inherit" onClick={handleDrawerToggle}>
                <Menu />
              </IconButton>
            ) : (
              <Tabs
                value={false}
                variant="fullWidth"
                indicatorColor="secondary"
              >
                <Tab
                  label="Home"
                  icon={<Home />}
                  onClick={() => handleNavigation("/home")}
                  sx={{
                    color: location.pathname === "/home" ? "#fff" : "#4d4d33",
                  }}
                />
                <Tab
                  label="Batches"
                  icon={<People />}
                  onClick={() => handleNavigation("/batches")}
                  sx={{
                    color:
                      location.pathname === "/batches" ? "#fff" : "#4d4d33",
                  }}
                />
                <Tab
                  label="Leaderboard"
                  icon={<LeaderboardIcon />}
                  onClick={() => handleNavigation("/leaderboard")}
                  sx={{
                    color:
                      location.pathname === "/leaderboard" ? "#fff" : "#4d4d33",
                  }}
                />
                <Tab
                  label="Contests"
                  icon={<TrophyIcon />}
                  onClick={() => handleNavigation("/contests")}
                  sx={{
                    color:
                      location.pathname === "/contests" ? "#fff" : "#4d4d33",
                  }}
                />
              </Tabs>
            )}
            {localStorage.getItem("user-data") && (
              <IconButton style={{backgroundColor:"#cca300"}} color="inherit" onClick={handleClick}>
                <Person fontSize="large" />
              </IconButton>
            )}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={2}
                minWidth="160px"
              >
                <IconButton
                  color="inherit"
                  onClick={() => {
                    history.push("/profile");
                  }}
                >
                  <Person fontSize="large" />
                  Profile
                </IconButton>
                <IconButton color="inherit" onClick={handleLogout}>
                  <ExitToApp fontSize="large" />
                  Logout
                </IconButton>
              </Box>
            </Popover>
          </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
          <List>
            <ListItem button onClick={() => handleNavigation("/home")}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/batches")}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Batches" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/leaderboard")}>
              <ListItemIcon>
                <LeaderboardIcon />
              </ListItemIcon>
              <ListItemText primary="Leaderboard" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/contests")}>
              <ListItemIcon>
                <TrophyIcon />
              </ListItemIcon>
              <ListItemText primary="Contests" />
            </ListItem>
          </List>
        </Drawer>

        <main style={{ flexGrow: 1 }}>{children}</main>

        <footer
          style={{
            backgroundColor: "#ffd633",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            &copy; {new Date().getFullYear()} ChaturaIT Learnings. All rights
            reserved.
          </Typography>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
