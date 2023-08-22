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
import ApiService from '../http/ApiService';
import CircularProgress from "@mui/material/CircularProgress";

const PageContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100vh',
  width: '100%',
  backgroundColor: '#354f52',
  color: 'white',
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

const Header = styled('header')({
  backgroundColor: '#ffd633',
  padding: '20px',
  textAlign: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  height: '7vh',
  color: '#001a1a',
});

const Footer = styled('footer')({
  backgroundColor: '#ffd633',
  padding: '10px',
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  height: '5vh',
  color: '#001a1a',
});

const GoogleLoginButton = styled(GoogleLogin)({
  width: '100%',
  maxWidth: '300px',
  backgroundColor: '#f9a825',
  color: '#fff',
  border: '2px solid #f9a825',
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '16px',
  textTransform: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#ffc107',
    borderColor: '#ffc107',
  },
});

const LoginFormContainer = styled(Grid)({
  width: '80%',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
});


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const service = new ApiService()

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

    service.post("/auth/login",{idToken:response.credential}).then((data)=>{
      localStorage.setItem('token', data.token);
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        history.push('/home');
      }, 1000);
    }).catch((err)=>{
      console.error("Error: ",err)
    })
    
  };

  const handleGoogleLoginFailure = (error) => {
    console.log('Google Login Error:', error);
  };

  return (
    <div style={{ backgroundColor: "#354f52", height: "100vh", color: "#fff" }}>
      {
       
        <>
          {" "}
          <Header>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to ChaturaIT Learnings
            </Typography>
          </Header>
          {loading? <CircularProgress
    size={60}
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
  />:<LoginFormContainer container>
            <Grid item xs={12} md={6}>
              <Typography variant="h2">Welcome Back!</Typography>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                Please login to continue accessing ChaturaIT Learnings.
              </Typography>
              <form sx={{ width: "100%", marginTop: 2 }}>
                <TextField
                  sx={{ marginBottom: 2, color: "#fff" }}
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
              <SignupLink
                variant="body1"
                align="center"
                sx={{ marginTop: 2, color: "#fff" }}
              >
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </SignupLink>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <GoogleLoginButton
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginFailure}
                />
              </div>
            </Grid>
          </LoginFormContainer>}
          <Footer>
            <Typography variant="body2" gutterBottom>
              &copy; {new Date().getFullYear()} ChaturaIT Learnings. All rights
              reserved.
            </Typography>
          </Footer>
        </>
      }
    </div>
  );
};

export default Login;
