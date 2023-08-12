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
    backgroundColor: "#997a00",
    marginRight: theme.spacing(2),
    width:"70px",
    height:"65px"
  },
  logoText: {
    color: '#fff',
    fontWeight: "800",
    letterSpacing: '1px', // Add some letter spacing for visibility
  },
}));

function Logo() {
  const classes = useStyles();

  return (
    <div className={classes.logoContainer}>
      <Avatar className={classes.avatar} style={{width:"72px",height:"70px",backgroundColor:"#997a00"}}>
        <SchoolIcon  fontSize='large' /> {/* Replace with your desired icon */}
      </Avatar>
      <Typography variant="h6" className={classes.logoText} style={{"fontSize":"30px"}}>
        ChaturaIt
      </Typography>
    </div>
  );
}

export default Logo;
