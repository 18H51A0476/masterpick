import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container, Box, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CircularProgress from "@mui/material/CircularProgress";

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
  position: 'sticky',
  bottom: '0',
  left: '0',
  right: '0',
  zIndex: '1',
  height: '5vh',
  color: '#001a1a',
});

const Body = styled('div')(({ theme }) => ({
  backgroundColor: '#003333',
  color: '#fef3c2',
  padding: '20px',
  minHeight: '85vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  overflowY: 'auto', // Enable vertical scrolling within the body
}));

const LoginButton = styled(Button)({
  fontSize: '1.5rem',
  marginTop: '20px',
  backgroundColor: '#ffd633',
  color: '#001a1a',
  '&:hover': {
    backgroundColor: '#b38f00',
  },
});

const CarouselContainer = styled('div')(({ theme }) => ({
  width: '100%', // Take 100% width of the parent container
  height: '50vh',
  margin: 'auto',
  marginTop: '30px',
  marginBottom: '30px',
}));

const CarouselSlide = styled('div')(({ theme }) => ({
  padding: '0px',
  borderRadius: '8px',
  textAlign: 'center',
  height: '100%', // Take 100% height of the carousel container
  width: '100%', // Take 100% width of the carousel container
  display: 'flex',
  justifyContent: 'center',
}));

const Image = styled('img')({
  maxHeight: '100%', // Set the max height of the image to 100% of the slide's height
  maxWidth: '100%', // Set the max width of the image to 100% of the slide's width
  objectFit: 'contain', // Ensure the image fits within the slide while maintaining its aspect ratio
});

const Quote = styled('div')({
  marginBottom: '20px',
  color: '#fff',
});

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
    {
      loading ? 
        <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <CircularProgress size={60} />
        </Container>:
      <div>
      <Header>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to ChaturaIT Learnings
        </Typography>
      </Header>
      <Body>
        <Quote>
          <Typography variant="h6" gutterBottom>
            "Coding is the language of possibilities."
          </Typography>
        </Quote>
        

        <Typography variant="h4" gutterBottom>
          Empower Your Skills with Our Online Learning Platform
        </Typography>
        <Typography variant="body1" paragraph>
          Our platform offers a wide range of high-quality courses in various domains. Enhance your knowledge, boost your career, and learn from industry experts.
        </Typography>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <LoginButton variant="contained" color="primary">
            Login to Continue
          </LoginButton>
        </Link>
      </Body>
      <Footer>
        <Typography variant="body2" gutterBottom>
          &copy; {new Date().getFullYear()} ChaturaIT Learnings. All rights reserved.
        </Typography>
      </Footer>
      </div>}
    </>
  );
};

export default LandingPage;
