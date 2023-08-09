import React from 'react';
import { Typography, Avatar } from '@mui/material';
import { makeStyles} from '@mui/styles'
import SchoolIcon from '@mui/icons-material/School'; // Replace with your desired icon

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1), // Add a border radius for style
  },
  avatar: {
    backgroundColor: "#cca300",
    marginRight: theme.spacing(2),
    width:"60px",
    height:"55px"
  },
  logoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '24px',
    letterSpacing: '1px', // Add some letter spacing for visibility
  },
}));

function Logo() {
  const classes = useStyles();

  return (
    <div className={classes.logoContainer}>
      <Avatar className={classes.avatar}>
        <SchoolIcon fontSize='large' /> {/* Replace with your desired icon */}
      </Avatar>
      <Typography variant="h6" className={classes.logoText}>
        ChaturaIt
      </Typography>
    </div>
  );
}

export default Logo;
