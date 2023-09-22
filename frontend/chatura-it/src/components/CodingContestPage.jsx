import React, { useState, useEffect } from "react";
import {
  Container,
  Tabs,
  Tab,
  Paper,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import { makeStyles, createStyles, Theme } from "@mui/styles";
import ContestDetails from "./ContestDetails";
import ContestProblems from "./ContestProblems";
import Leaderboard from "./Leaderboard";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  progressBar: {
    height: 20, // Increase the height of the progress bar
    borderRadius: 5,
    backgroundColor: "#f0f0f0", // Background color of the progress bar container
  },
  progressBarColorPrimary: {
    backgroundColor: theme.palette.primary.main, // Custom progress bar color
  },
  progressLabel: {
    marginTop: theme.spacing(1),
  },
}));

const CodingContestPage = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);
  const [contestEndTime, setContestEndTime] = useState(new Date().getTime() + 3600000); // Set contest end time (1 hour from now)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = Math.max(contestEndTime - currentTime, 0);
      const progressPercentage = ((contestEndTime - currentTime) / 3600000) * 100;
      setProgress(progressPercentage);
      if (remainingTime <= 0) {
        clearInterval(timer);
        // Handle contest end logic here
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [contestEndTime]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container>
      <Paper elevation={3} className={classes.card}>
      <Typography variant="h4" gutterBottom>
        Coding Contest
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        classes={{
          root: classes.progressBar,
          colorPrimary: classes.progressBarColorPrimary,
        }}
      />
      <Typography variant="subtitle2" className={classes.progressLabel}>
        Contest Ends in: {Math.round(((contestEndTime - new Date().getTime()) / 60000))} minutes
      </Typography>
    </Paper>

      <Paper elevation={3}>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Contest Details" />
          <Tab label="Problems" />
          <Tab label="Leaderboard" />
        </Tabs>
      </Paper>

      <Box mt={2}>
        {currentTab === 0 && <ContestDetails />}
        {currentTab === 1 && <ContestProblems />}
        {currentTab === 2 && <Leaderboard />}
      </Box>
    </Container>
  );
};

export default CodingContestPage;
