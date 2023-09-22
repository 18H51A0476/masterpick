import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import ApiService from "../http/ApiService";
import ConfirmationDialog from "./Confirmationdialog";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    background: "#354f52",
  },
  container: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    background: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    boxSizing: "border-box",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 8px",
  },
  evenRow: {
    backgroundColor: theme.palette.grey[100],
  },
  oddRow: {
    backgroundColor: theme.palette.background.default,
  },
  tableHeadCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.contrastText,
    borderBottom: `2px solid`,
    padding: theme.spacing(1, 2),
  },
  tableCell: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(1, 2),
  },
  searchContainer: {
    marginBottom: theme.spacing(2),
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between", // Arrange items evenly
  },
  searchInput: {
    flex: 1, // Take up equal space in the row
    marginRight: theme.spacing(1),
  },
  select: {
    flex: 1, // Take up equal space in the row
    marginLeft: theme.spacing(1),
  },
  difficultySelect: {
    flex: 1, // Take up equal space in the row
    marginLeft: theme.spacing(1),
  },
  select: {
    flex: "1", // Take up equal space in the row
    marginLeft: theme.spacing(1),
    height: "100%", // Make the dropdowns the same height as the input
  },
  searchButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  paginationToolbar: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paginationSelect: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  paginationSelectIcon: {
    color: theme.palette.primary.main,
    right: theme.spacing(1),
  },
  createButton: {
    margin: theme.spacing(4),
  },
  dialogContent: {
    overflowY: "auto", // Enable scrolling for content
  },
  selectMultiple: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

const Problems = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [problems, setProblems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Define isEditDialogOpen state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Define isDeleteDialogOpen state
  const history = useHistory();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
 

  const service = new ApiService();
  const classes = useStyles();

  const [problemInfo, setProblemInfo] = useState({
    title: "",
    difficulty: "",
    tags: [],
  });


  const handleEditClick = (problem) => {
    // Implement edit click logic
  };

  const handleDeleteClick = (problem) => {
    // Implement delete click logic
  };

  const handleEditProblem = () => {
    // Implement edit functionality using selectedProblemForEdit
    // Close the edit modal
    setIsEditDialogOpen(false);
  };

  const handleDeleteProblem = () => {
    // Implement delete functionality using selectedProblemForEdit
    // Close the delete modal
    setIsDeleteDialogOpen(false);
  };

  useEffect(() => {
    // Replace 'apiEndpointForProblems' with your actual API endpoint
    service
      .get("/problem")
      .then((data) => {
        setProblems(data?.data);
      })
      .catch((error) => {
        console.error("Error fetching problems data from API:", error);
      });
  }, []);

  

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateProblemClick = () => {
    history.push("/problems/create")
  };

  const fetchProblems = (query, currentPage, pageSize) => {
    setLoading(true);

    const queryParams = `searchQuery=${query}&page=${currentPage}&pageSize=${pageSize}&tags=${selectedTags.join(",")}&difficulty=${selectedDifficulty}`;

    service
      .get(`/problem?${queryParams}`)
      .then((data) => {
        setProblems(data.problems);
        setTotalCount(data.totalCount);
      })
      .catch((err) => {
        console.error("Error in getting Problems:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchClick = () => {
    fetchProblems(searchQuery, page, rowsPerPage);
  };

  useEffect(() => {
    if (searchQuery === "") {
      fetchProblems("", page, rowsPerPage);
    }
  }, [searchQuery, page, rowsPerPage]);

  useEffect(() => {
    setLoading(true);

    service
      .get(`/problems/?page=${page}&pageSize=${rowsPerPage}`)
      .then((data) => {
        setProblems(data.problems);
        setTotalCount(data.totalCount);
      })
      .catch((err) => {
        console.error("Error in getting Problems:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, rowsPerPage]);


  const handleCreateProblem = () => {
    setLoading(true);
    service
      .post("/problems", problemInfo)
      .then((data) => {
        fetchProblems(searchQuery, page, rowsPerPage);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error creating Problem", err);
      });

    // Close the dialog
    setIsCreateDialogOpen(false);

    // Clear the problemInfo state for the next create operation
    setProblemInfo({
      title: "",
      difficulty: "",
      tags: [],
    });
  };

  useEffect(() => {
    if (searchQuery === "") {
      fetchProblems("", page, rowsPerPage);
    }
  }, [searchQuery, page, rowsPerPage]);

  useEffect(() => {
    setLoading(true);
    service
      .get(`/problems/?page=${page}&pageSize=${rowsPerPage}`)
      .then((data) => {
        setProblems(data.problems);
        setTotalCount(data.totalCount);
      })
      .catch((err) => {
        console.error("Error in getting Problems:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, rowsPerPage]);

  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress size={60} />
      ) : (
        <Container className={classes.container} style={{ width: "100%" }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.createButton}
            style={{ marginTop: "1%", marginBottom: "1%" }}
            onClick={handleCreateProblemClick}
          >
            Create New Problem
          </Button>
          <div className={classes.searchContainer} style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <TextField
              className={classes.searchInput}
              style={{ flex: 1, marginRight: "8px" }}
              label="Search problem by Title"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className={classes.searchButton}
                      onClick={handleSearchClick}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
             <FormControl variant="outlined" className={classes.difficultySelect} style={{ flex: 1, marginLeft: "8px" }}>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                label="Difficulty"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
                <MenuItem value="Very Easy">Very Easy</MenuItem>
                <MenuItem value="Very Hard">Very Hard</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
                <MenuItem value="Expert">Expert</MenuItem>
                <MenuItem value="Master">Master</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.select} style={{ flex: 1, marginLeft: "8px" }}>
              <InputLabel>Tags</InputLabel>
              <Select
                multiple
                value={selectedTags}
                onChange={(e) => setSelectedTags(e.target.value)}
                label="Tags"
                renderValue={(selected) => selected.join(", ")}
              >
                <MenuItem value="Array">Array</MenuItem>
                <MenuItem value="String">String</MenuItem>
                <MenuItem value="LinkedList">Linked List</MenuItem>
                <MenuItem value="Tree">Tree</MenuItem>
                <MenuItem value="Dynamic Programming">Dynamic Programming</MenuItem>
                <MenuItem value="Sorting">Sorting</MenuItem>
                <MenuItem value="Searching">Searching</MenuItem>
                <MenuItem value="Graph">Graph</MenuItem>
                <MenuItem value="Recursion">Recursion</MenuItem>
                <MenuItem value="Greedy">Greedy</MenuItem>
                <MenuItem value="Bit Manipulation">Bit Manipulation</MenuItem>
                <MenuItem value="Hashing">Hashing</MenuItem>
                <MenuItem value="Math">Math</MenuItem>
                <MenuItem value="Geometry">Geometry</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                {/* Add your other tag options here */}
              </Select>
            </FormControl>
          </div>
          <TableContainer
            component={Paper}
            className={classes.table}
            style={{ width: "100%" }}
          >
            <Table
              aria-label="problem management table"
              style={{ width: "100%" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>Title</TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Difficulty
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>Tags</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {problems?.map((problem, index) => (
                  <TableRow
                    key={problem.id}
                    className={
                      index % 2 === 0 ? classes.evenRow : classes.oddRow
                    }
                    hover
                  >
                    <TableCell className={classes.tableCell}>
                      {problem.title}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {problem.difficulty}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {problem.tags.join(", ")}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Button
                        onClick={() => history.push("/problems/create")}
                        variant="contained"
                        color="primary"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            classes={{
              toolbar: classes.paginationToolbar,
              select: classes.paginationSelect,
              selectIcon: classes.paginationSelectIcon,
            }}
          />
          <Dialog
            open={isCreateDialogOpen}
            onClose={() => setIsCreateDialogOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Create New Problem</DialogTitle>
            <DialogContent>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={problemInfo.title}
                onChange={(e) =>
                  setProblemInfo({ ...problemInfo, title: e.target.value })
                }
              />
              <TextField
                label="Difficulty"
                variant="outlined"
                fullWidth
                margin="normal"
                value={problemInfo.difficulty}
                onChange={(e) =>
                  setProblemInfo({
                    ...problemInfo,
                    difficulty: e.target.value
                  })
                }
              />
              <TextField
                label="Tags"
                variant="outlined"
                fullWidth
                margin="normal"
                value={problemInfo.tags.join(", ")}
                onChange={(e) =>
                  setProblemInfo({
                    ...problemInfo,
                    tags: e.target.value.split(", ")
                  })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setIsCreateDialogOpen(false)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button onClick={handleCreateProblem} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
          {/* Edit Problem Modal */}
          <Dialog
            open={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Edit Problem</DialogTitle>
            <DialogContent>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={selectedProblem?.title || ""}
                onChange={(e) =>
                  setSelectedProblem({
                    ...selectedProblem,
                    title: e.target.value
                  })
                }
              />
              <TextField
                label="Difficulty"
                variant="outlined"
                fullWidth
                margin="normal"
                value={selectedProblem?.difficulty || ""}
                onChange={(e) =>
                  setSelectedProblem({
                    ...selectedProblem,
                    difficulty: e.target.value
                  })
                }
              />
              <TextField
                label="Tags"
                variant="outlined"
                fullWidth
                margin="normal"
                value={selectedProblem?.tags.join(", ") || ""}
                onChange={(e) =>
                  setSelectedProblem({
                    ...selectedProblem,
                    tags: e.target.value.split(", ")
                  })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setIsEditDialogOpen(false)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button onClick={handleEditProblem} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Problem Confirmation Modal */}
          <ConfirmationDialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleDeleteProblem}
            title="Confirm Delete"
            contentText={`Are you sure you want to delete the problem with Title: ${selectedProblem?.title}?`}
          />
        </Container>
      )}
    </div>
  );
};

export default Problems;
