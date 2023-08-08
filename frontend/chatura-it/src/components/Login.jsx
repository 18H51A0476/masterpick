import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Snackbar,
} from '@mui/material';
import { Alert } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { styled } from '@mui/material/styles';

const PageContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100vh',
  width:'100%'
});

const LoginButton = styled(Button)({
  backgroundColor: '#ffd633',
  color: '#001a1a',
  '&:hover': {
    backgroundColor: '#b38f00',
  },
});

const SignupLink = styled(Typography)({
  marginTop: 2,
});

const Header = styled('header')(({ theme }) => ({
  backgroundColor: '#ffd633',
  padding: '20px',
  textAlign: 'center',
  position: 'sticky',
  top: '0',
  zIndex: '1',
  height: '7vh',
  color: '#001a1a',
}));

const Footer = styled('footer')({
  backgroundColor: '#ffd633',
  padding: '10px',
  textAlign: 'center',
  position: 'fixed', // Use 'fixed' instead of 'sticky'
  bottom: '0',
  left: '0',
  right: '0',
  zIndex: '1',
  height: '5vh',
  color: '#001a1a',
});

const GoogleLoginButton = styled(GoogleLogin)({
  width: '100%',
  maxWidth: '300px', // Set the maximum width as needed
  backgroundColor: '#f9a825',
  color: '#fff',
  border: '2px solid #f9a825',
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '16px', // Adjust font size as needed
  textTransform: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center', // Center the content horizontally
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#ffc107',
    borderColor: '#ffc107',
  },
});



const LoginFormContainer = styled(Grid)({
  width: '80%',
  padding: '20px',
  display: 'flex', // Use flex display to align content
  flexDirection: 'column', // Stack children vertically
  justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
  margin: 'auto', // Center the form horizontally
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    const loginSuccess = true;

    if (loginSuccess) {
      setSnackbarMessage('Login Success');
      setShowSnackbar(true);
      setTimeout(() => {
        history.push('/home');
      }, 1000);
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    const decodedToken = jwt_decode(response.credential);
    console.log('Decoded Token:', decodedToken);
    localStorage.setItem('user-data', decodedToken);
    setSnackbarMessage('Login Success');
    setShowSnackbar(true);
    setTimeout(() => {
      history.push('/home');
    }, 2000);
  };

  const handleGoogleLoginFailure = (error) => {
    console.log('Google Login Error:', error);
  };

  return (
    <>
      <Header>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to ChaturaIT Learnings
        </Typography>
      </Header>
      <LoginFormContainer container>
        <Grid item xs={12} md={6}>
          <Typography variant="h2">Welcome Back!</Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Please login to continue accessing ChaturaIT Learnings.
          </Typography>
          <form sx={{ width: '100%', marginTop: 2 }}>
            <TextField
              sx={{ marginBottom: 2 }}
              type="text"
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              sx={{ marginBottom: 2 }}
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginButton
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </LoginButton>
          </form>
          <SignupLink variant="body1" align="center" sx={{ marginTop: 2 }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </SignupLink>
          <div style={{display:"flex",justifyContent:"center"}}>
          <GoogleLoginButton
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
          />
          </div>
        </Grid>
      </LoginFormContainer>
      <Footer>
        <Typography variant="body2" gutterBottom>
          &copy; {new Date().getFullYear()} ChaturaIT Learnings. All rights reserved.
        </Typography>
      </Footer>
    </>
  );
};

export default Login;
