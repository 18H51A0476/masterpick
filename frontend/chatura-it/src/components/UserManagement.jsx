import React, { useEffect, useState } from "react";
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
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
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
    '&:focus': {
      backgroundColor: 'transparent',
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
}));

const UserManagement = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const service = new ApiService();
  const classes = useStyles();

  const fetchUsers = (query, currentPage, pageSize) => {
    setLoading(true);
    service
      .get(`/admin/users?searchQuery=${query}&page=${currentPage}&pageSize=${pageSize}`)
      .then((data) => {
        setRows(data.users);
        setTotalCount(data.totalCount);
      })
      .catch((err) => {
        console.error("Error in getting Users:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchClick = () => {
    fetchUsers(searchQuery, page, rowsPerPage);
  };

  useEffect(() => {
    if (searchQuery === "") {
      fetchUsers("", page, rowsPerPage);
    }
  }, [searchQuery, page, rowsPerPage]);

  useEffect(() => {
    setLoading(true);
    service
      .get(`/admin/users?page=${page}&pageSize=${rowsPerPage}`)
      .then((data) => {
        setRows(data.users);
        setTotalCount(data.totalCount);
      })
      .catch((err) => {
        console.error("Error in getting Users:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRoleChangeClick = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setConfirmDialogOpen(true);
  };

  const handleRoleChangeConfirm = () => {
    setConfirmDialogOpen(false);
    service
      .put(`/admin/user/role`, { newRole ,...selectedUser})
      .then((data) => {
          console.log("updated Role",data)
          window.location.reload()
      })
      .catch((err) => {
        console.error("Error in updating user's role:", err);
      })
      .finally(() => {
        setSelectedUser(null);
        setNewRole("");
      });
  };

  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress size={60} />
      ) : (
        <Container className={classes.container} style={{width:"100%"}}>
          {/* <Typography variant="h4" gutterBottom>
            User Management
          </Typography> */}
          <div className={classes.searchContainer}>
            <TextField
              className={classes.searchInput}
              label="Search by Name/Roll Number/Email"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton className={classes.searchButton} onClick={handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <TableContainer  component={Paper} className={classes.table} style={{width:"100%"}}>
            <Table aria-label="user management table" style={{width:"100%"}}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>S.No</TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Name/Roll Number
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>Email</TableCell>
                  <TableCell className={classes.tableHeadCell}>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={row._id}
                      className={index % 2 === 0 ? classes.evenRow : classes.oddRow}
                      hover
                    >
                      <TableCell className={classes.tableCell}>
                        {index + 1 + page * rowsPerPage}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.name}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.email}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Select
                          value={row.role}
                          onChange={(e) =>{
                            setNewRole(e.target.value)
                            setSelectedUser(row)
                            setConfirmDialogOpen(true)
                          }

                          }
                          variant="outlined"
                          classes={{
                            select: classes.select,
                            icon: classes.selectIcon,
                          }}
                        >
                          <MenuItem value="student">Student</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="trainer">Trainer</MenuItem>
                        </Select>
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
          <ConfirmationDialog
            open={confirmDialogOpen}
            onClose={() => setConfirmDialogOpen(false)}
            onConfirm={handleRoleChangeConfirm}
            title="Change User's Role"
            contentText={`Change role of ${
              selectedUser?.name || ""
            } to ${newRole}?`}
          />
        </Container>
      )}
    </div>
  );
};

export default UserManagement;
