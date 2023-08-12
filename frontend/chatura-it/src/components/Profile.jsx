import React, { useEffect, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ApiService from '../http/ApiService';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100vh', // Set full screen height
    backgroundColor: '#354f52', // Blackish-green background color
    color: 'white', // Text color
    padding: theme.spacing(4), // Add padding for content
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column', // Stack sections on smaller screens
      alignItems: 'center',
    },
  },
  cardContainer: {
    flex: '0 0 25%',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flex: '1', // Take full width on smaller screens
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    color: 'white',
    backgroundColor: '#2B3945',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(60), // Increased avatar size
    height: theme.spacing(60), // Increased avatar size
    marginBottom: theme.spacing(2),
  },
  contentContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    color: "#d3d3d3",
    backgroundColor: '#2B3945',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(3),
  },
  workInProgress: {
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#FF5733',
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const service = new ApiService()

  useEffect(() => {
    setLoading(true);
    service.get("/user/profile")
      .then((data) => {
        console.log("User Data:", data);
        setProfileData(data.user);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error: ", err);
      });
  }, []);

  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress size={60} />
      ) : (
        <>
          {profileData && Object.keys(profileData).length > 0 ? ( // Check if profileData is available
            <>
              <div className={classes.cardContainer}>
                <Card className={classes.card}>
                  <Avatar
                    alt="User Picture"
                    src={profileData.picture}
                    className={classes.avatar}
                    style={{ width: "90px", height: "90px" }}
                  />
                  <CardContent>
                    <Typography variant="h5" >{profileData.name}</Typography>
                    <Typography  >
                      {profileData.email}
                    </Typography>
                    <Typography  >
                      Role: {profileData.role}
                    </Typography>
                    {/* Add more user data fields here */}
                  </CardContent>
                </Card>
              </div>
              <div className={classes.contentContainer}>
                <Typography variant="h6" className={classes.workInProgress}>
                  Work in Progress
                </Typography>
                {/* Add your work in progress content here */}
              </div>
            </>
          ) : (
            <Typography variant="body1">No user data available.</Typography>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
