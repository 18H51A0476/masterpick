import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tab,
  Tabs,
  Box,
  TextareaAutosize,
} from "@mui/material";
import { makeStyles, createStyles, Theme } from "@mui/styles";
import {
  AddCircleOutline,
  RemoveCircleOutline,
  CheckCircleOutline,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) =>
  createStyles({
    formContainer: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(3),
      backgroundColor: "white",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: theme.spacing(2),
    },
    heading: {
      marginBottom: theme.spacing(2),
    },
    tabContent: {
      marginTop: theme.spacing(2),
    },
    disclaimerTextArea: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    saveButton: {
      marginTop: theme.spacing(2),
    },
  })
);

const CreateContest = () => {
  const classes = useStyles();

  const [contestDetails, setContestDetails] = useState({
    title: "",
    startTime: "",
    endTime: "",
    slug: "",
    disclaimer: "",
    // Add more contest details as needed
  });

  const [problemList, setProblemList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [currentTab, setCurrentTab] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContestDetails({
      ...contestDetails,
      [name]: value,
    });
  };

  const handleSearch = () => {
    // Implement your search logic here
    // Replace the following with your actual API call or data retrieval logic
    const mockSearchResults = [
      { id: 1, title: "Problem 1" },
      { id: 2, title: "Problem 2" },
      // Add more search results as needed
    ];
    setSearchResults(mockSearchResults);
  };

  const handleAddProblem = (problem) => {
    // Check if the problem is already added to the list
    if (!problemList.some((p) => p.id === problem.id)) {
      // Add the selected problem to the list of problems for the contest
      setProblemList([...problemList, problem]);
    }
  };

  const handleRemoveProblem = (problemId) => {
    // Remove a problem from the list of problems for the contest
    const updatedProblemList = problemList.filter(
      (problem) => problem.id !== problemId
    );
    setProblemList(updatedProblemList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your submission logic here
    console.log("Contest details submitted:", contestDetails);
    console.log("Selected problems:", problemList);
    // You can add API calls or other logic to create the contest
    // Redirect to the contests list or show a success message
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const TabPanel = ({ children, value, index }) => {
    return value === index ? <div className={classes.tabContent}>{children}</div> : null;
  };

  return (
    <Container>
      <div className={classes.formContainer}>
        <Typography variant="h4" className={classes.heading}>
          Create New Contest
        </Typography>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Details" />
          <Tab label="Problems" />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          {/* Details Tab */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  variant="outlined"
                  required
                  value={contestDetails.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Time"
                  name="startTime"
                  type="datetime-local"
                  variant="outlined"
                  required
                  value={contestDetails.startTime}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Time"
                  name="endTime"
                  variant="outlined"
                  type="datetime-local"
                  required
                  value={contestDetails.endTime}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contest Slug"
                  name="slug"
                  variant="outlined"
                  required
                  value={contestDetails.slug}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Disclaimer</Typography>
                <TextareaAutosize
  className={classes.disclaimerTextArea}
  style={{ width: '100%', height: '100px' ,resize:"none"}} // Set fixed width and height
  placeholder="Enter contest disclaimer..."
  name="disclaimer"
  value={contestDetails.disclaimer}
  onChange={handleInputChange}
/>

              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.saveButton}
            >
              Create Contest
            </Button>
          </form>
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          {/* Problems Tab */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Search Problems"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                style={{ marginTop: "8px", marginLeft: "8px" }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          <List>
            {searchResults.map((result) => (
              <ListItem key={result.id}>
                <ListItemText primary={result.title} />
                <ListItemSecondaryAction>
                  {problemList.some((p) => p.id === result.id) ? (
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveProblem(result.id)}
                      color="secondary"
                    >
                      <RemoveCircleOutline />
                    </IconButton>
                  ) : (
                    <IconButton
                      edge="end"
                      onClick={() => handleAddProblem(result)}
                      color="primary"
                    >
                      <AddCircleOutline />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.saveButton}
          >
            Save
          </Button>
          <Typography variant="h6" style={{ marginTop: "24px" }}>
            Selected Problems:
          </Typography>
          <List>
            {problemList.map((problem) => (
              <ListItem key={problem.id}>
                <ListItemText primary={problem.title} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleRemoveProblem(problem.id)}
                    color="secondary"
                  >
                    <RemoveCircleOutline />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </div>
    </Container>
  );
};

export default CreateContest;
