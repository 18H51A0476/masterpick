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
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import ApiService from "../http/ApiService";
import ConfirmationDialog from "./Confirmationdialog";

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
  select: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(5),
    borderRadius: theme.spacing(1),
    borderColor: theme.palette.primary.main,
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  selectIcon: {
    color: theme.palette.primary.main,
    right: theme.spacing(2),
  },
  searchContainer: {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  searchInput: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
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
}));

const Batches = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [collegeData, setCollegeData] = useState([]);
  const currentYear = new Date().getFullYear();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [selectedBatchForEdit, setSelectedBatchForEdit] = useState(null);
  const academicYears = Array.from({ length: 5 }, (_, i) => {
    const startYear = 2018 + i;
    const endYear = startYear + 4;
    return `${startYear}-${endYear}`;
  });

  const [batchInfo, setBatchInfo] = useState({
    batchName: "",
    collegeName: "",
    academicYear: "",
    department: "",
  });

  const service = new ApiService();
  const classes = useStyles();

  const handleEditClick = (batch) => {
    setSelectedBatchForEdit(batch);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (batch) => {
    setSelectedBatchForEdit(batch);
    setIsDeleteDialogOpen(true);
  };

  const handleEditBatch = () => {
    // Implement edit functionality using selectedBatchForEdit
    console.log(`Edit Batch with ID ${selectedBatchForEdit._id}`);
    setLoading(true)
    service
      .put("/batch/" + selectedBatchForEdit._id, selectedBatchForEdit)
      .then((data) => {
        console.log(data);
        fetchBatches(searchQuery, page, rowsPerPage);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.error("Error creating Batch", err);
      });

    // Close the edit modal
    setIsEditDialogOpen(false);
  };

  const handleDeleteBatch = () => {
    // Implement delete functionality using selectedBatchForEdit
    console.log(`Delete Batch with ID ${selectedBatchForEdit._id}`);
    // Close the delete modal
    setIsDeleteDialogOpen(false);
  };

  useEffect(() => {
    // Replace 'apiEndpointForColleges' with your actual API endpoint
    service
      .get("/college/all")
      .then((data) => {
        console.log(data);
        setCollegeData(data?.data);
      })
      .catch((error) => {
        console.error("Error fetching college data from API:", error);
      });
  }, []);

  const fetchBatches = (query, currentPage, pageSize) => {
    setLoading(true);
    service
      .get(
        `/batch?searchQuery=${query}&page=${currentPage}&pageSize=${pageSize}`
      )
      .then((data) => {
        setRows(data.batches);
        setTotalCount(data.totalCount);
      })
      .catch((err) => {
        console.error("Error in getting Batches:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchClick = () => {
    fetchBatches(searchQuery, page, rowsPerPage);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateBatchClick = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateBatch = () => {
    setLoading(true)
    service
      .post("/batch", batchInfo)
      .then((data) => {
        console.log(data);
        fetchBatches(searchQuery, page, rowsPerPage);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.error("Error creating Batch", err);
      });

    // Close the dialog
    setIsCreateDialogOpen(false);

    // Clear the batchInfo state for the next create operation
    setBatchInfo({
      batchName: "",
      collegeName: "",
      academicYear: "",
      department: "",
    });
  };

  useEffect(() => {
    if (searchQuery === "") {
      fetchBatches("", page, rowsPerPage);
    }
  }, [searchQuery, page, rowsPerPage]);

  useEffect(() => {
    setLoading(true);
    service
      .get(`/batch/?page=${page}&pageSize=${rowsPerPage}`)
      .then((data) => {
        setRows(data.batches);
        setTotalCount(data.totalCount);
      })
      .catch((err) => {
        console.error("Error in getting Batches:", err);
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
            onClick={handleCreateBatchClick}
          >
            Create New Batch
          </Button>
          <div className={classes.searchContainer}>
            <TextField
              className={classes.searchInput}
              label="Search by Name/ID/Status"
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
          </div>
          <TableContainer
            component={Paper}
            className={classes.table}
            style={{ width: "100%" }}
          >
            <Table
              aria-label="batch management table"
              style={{ width: "100%" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>ID</TableCell>
                  <TableCell className={classes.tableHeadCell}>Name</TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Status
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={
                      index % 2 === 0 ? classes.evenRow : classes.oddRow
                    }
                    hover
                  >
                    <TableCell className={classes.tableCell}>
                      {row?._id}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {row?.batchName}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {row?.status === true ? "Active" : "Not Active"}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {/* Edit button */}
                      <Button
                        onClick={() => handleEditClick(row)}
                        variant="outlined"
                        color="primary"
                      >
                        Edit
                      </Button>
                      {/* Delete button */}
                      <Button
                        onClick={() => handleDeleteClick(row)}
                        variant="outlined"
                        color="secondary"
                      >
                        Delete
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
            <DialogTitle>Create New Batch</DialogTitle>
            <DialogContent>
              <TextField
                label="Batch Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={batchInfo.batchName}
                onChange={(e) =>
                  setBatchInfo({ ...batchInfo, batchName: e.target.value })
                }
              />
              <TextField
                label="College Name"
                variant="outlined"
                fullWidth
                margin="normal"
                select // Use 'select' to render a dropdown
                value={batchInfo.collegeName}
                onChange={(e) =>
                  setBatchInfo({ ...batchInfo, collegeName: e.target.value })
                }
              >
                {collegeData?.map((college) => (
                  <MenuItem key={college._id} value={college.collegeName}>
                    {college.collegeName}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Academic Year"
                variant="outlined"
                fullWidth
                margin="normal"
                select // Use 'select' to render a dropdown
                value={batchInfo.academicYear}
                onChange={(e) =>
                  setBatchInfo({ ...batchInfo, academicYear: e.target.value })
                }
              >
                {academicYears?.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Department"
                variant="outlined"
                fullWidth
                margin="normal"
                value={batchInfo.department}
                onChange={(e) =>
                  setBatchInfo({ ...batchInfo, department: e.target.value })
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
              <Button onClick={handleCreateBatch} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
          {/* Edit Batch Modal */}
          <Dialog
            open={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Edit Batch</DialogTitle>
            <DialogContent>
              <TextField
                label="Batch Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={selectedBatchForEdit?.batchName || ""}
                onChange={(e) =>
                  setSelectedBatchForEdit({
                    ...selectedBatchForEdit,
                    batchName: e.target.value,
                  })
                }
              />
              <TextField
                label="College Name"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                value={selectedBatchForEdit?.collegeName || ""}
                onChange={(e) =>
                  setSelectedBatchForEdit({
                    ...selectedBatchForEdit,
                    collegeName: e.target.value,
                  })
                }
              >
                {collegeData?.map((college) => (
                  <MenuItem key={college._id} value={college.collegeName}>
                    {college.collegeName}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Academic Year"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                value={selectedBatchForEdit?.academicYear || ""}
                onChange={(e) =>
                  setSelectedBatchForEdit({
                    ...selectedBatchForEdit,
                    academicYear: e.target.value,
                  })
                }
              >
                {academicYears?.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Department"
                variant="outlined"
                fullWidth
                margin="normal"
                value={selectedBatchForEdit?.department || ""}
                onChange={(e) =>
                  setSelectedBatchForEdit({
                    ...selectedBatchForEdit,
                    department: e.target.value,
                  })
                }
              />
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                value={selectedBatchForEdit?.status}
                onChange={(e) =>
                  setSelectedBatchForEdit({
                    ...selectedBatchForEdit,
                    status: e.target.value,
                  })
                }
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Not Active</MenuItem>
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setIsEditDialogOpen(false)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button onClick={handleEditBatch} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Batch Confirmation Modal */}
          <ConfirmationDialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleDeleteBatch}
            title="Confirm Delete"
            contentText={`Are you sure you want to delete the batch with Name: ${selectedBatchForEdit?.batchName}?`}
          />
        </Container>
      )}
    </div>
  );
};

export default Batches;
