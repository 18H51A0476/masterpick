import React, { useEffect } from "react";
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
import { useHistory } from 'react-router-dom';

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

const Contests = () => {
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedContest, setSelectedContest] = React.useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const history = useHistory()

  const [contestInfo, setContestInfo] = React.useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  const service = new ApiService();
  const classes = useStyles();

  const handleEditClick = (contest) => {
    // Implement the edit functionality here
  };

  const handleDeleteClick = (contest) => {
    // Implement the delete functionality here
  };

  const handleCreateContestClick = () => {
   history.push("/contests/create")
  };

  const handleCreateContest = () => {
    // Implement the create contest functionality here
  };

  useEffect(() => {
    // Fetch contests and set loading to false when data is available
    setLoading(true);
    service
      .get(`/contests/?page=${page}&pageSize=${rowsPerPage}`)
      .then((data) => {
        setRows(data.contests);
        setTotalCount(data.totalCount);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error in getting Contests:", err);
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
            onClick={handleCreateContestClick}
          >
            Create New Contest
          </Button>
          <div className={classes.searchContainer}>
            <TextField
              className={classes.searchInput}
              label="Search by Title/ID"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className={classes.searchButton}
                      onClick={() => {
                        // Implement search functionality here
                      }}
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
            <Table aria-label="contest management table" style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>ID</TableCell>
                  <TableCell className={classes.tableHeadCell}>Title</TableCell>
                  <TableCell className={classes.tableHeadCell}>Start Time</TableCell>
                  <TableCell className={classes.tableHeadCell}>End Time</TableCell>
                  <TableCell className={classes.tableHeadCell}>Actions</TableCell>
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
                      {row.id}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {row.title}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {row.startTime}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {row.endTime}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Button
                        onClick={() => handleEditClick(row)}
                        variant="outlined"
                        color="primary"
                      >
                        Edit
                      </Button>
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
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
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
            <DialogTitle>Create New Contest</DialogTitle>
            <DialogContent>
              {/* Implement form fields for creating a new contest here */}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setIsCreateDialogOpen(false)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateContest}
                color="primary"
                variant="contained"
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      )}
    </div>
  );
};

export default Contests;
