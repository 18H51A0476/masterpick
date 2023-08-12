import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const courses = [
  { title: "C Programming", description: "Learn C programming language." },
  {
    title: "C++ Programming",
    description: "Explore the world of C++ programming.",
  },
  {
    title: "Java Programming",
    description: "Master Java programming language.",
  },
  {
    title: "Python Programming",
    description: "Dive into Python programming language.",
  },
];

const Home = () => {
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#354f52",
        color: "white",
        maxHeight: "71.7vh",
        padding: "40px 0",
        
      }}
    >
      <Container maxWidth="md">
        <Box mt={5} textAlign="center">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Welcome to ChaturaIT Learnings
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Empower Your Skills with Our Online Learning Platform
          </Typography>
          <Typography
            variant="body1"
            paragraph
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Our platform offers a wide range of high-quality courses in various
            domains. Enhance your knowledge, boost your career, and learn from
            industry experts.
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {courses.map((course, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 2,
                  backgroundColor: "#2B3945", // Blackish-green background color
                }}
              >
                <CardActionArea component={Link} to={`/course/${course.title}`}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        color: "white", // Text color set to white
                      }}
                    >
                      {course.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        color: "white", // Text color set to white
                      }}
                    >
                      {course.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
