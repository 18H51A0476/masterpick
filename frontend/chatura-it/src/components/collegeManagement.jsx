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
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Modal,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ApiService from "../http/ApiService";

const CollegeManagement = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [colleges, setColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCollegeName, setEditedCollegeName] = useState("");
  const [newCollegeName, setNewCollegeName] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const service = new ApiService();

  const fetchColleges = (query, currentPage, pageSize) => {
    setLoading(true);
    service
      .get(`/college?searchQuery=${query}&page=${currentPage}&pageSize=${pageSize}`)
      .then((data) => {
        setColleges(data.colleges);
        setTotalCount(data.totalCount);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error in getting colleges:", err);
        setLoading(false);
      });
  };

  const handleSearchClick = () => {
    fetchColleges(searchQuery, page, rowsPerPage);
  };

  useEffect(() => {
    if (searchQuery === "") {
      fetchColleges("", page, rowsPerPage);
    }
  }, [searchQuery, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddCollege = () => {
    if (newCollegeName.trim() !== "") {
      setLoading(true);
      service
        .post("/college/add", { collegeName: newCollegeName })
        .then(() => {
          setNewCollegeName("");
          fetchColleges(searchQuery, page, rowsPerPage);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleEdit = (college) => {
    setEditedCollegeName(college.collegeName);
    setSelectedCollege(college);
    setEditModalOpen(true);
  };

  const confirmEdit = () => {
    if (editedCollegeName.trim() !== "") {
      setLoading(true);
      service
        .put(`/college/${selectedCollege._id}`, { collegeName: editedCollegeName })
        .then(() => {
          setEditModalOpen(false);
          setSelectedCollege(null);
          setEditedCollegeName("");
          fetchColleges(searchQuery, page, rowsPerPage);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleDelete = (college) => {
    setSelectedCollege(college);
    setConfirmDeleteModal(true);
  };

  const confirmDelete = () => {
    setLoading(true);
    service
      .delete(`/college/${selectedCollege._id}`)
      .then(() => {
        setConfirmDeleteModal(false);
        setSelectedCollege(null);
        fetchColleges(searchQuery, page, rowsPerPage);
      })
      .catch((err) => {
        console.error("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", background: "#354f52" }}>
      {loading ? (
        <CircularProgress size={60} />
      ) : (
        <Container style={{ marginTop: "60px", padding: "24px", borderRadius: "8px", background: "white", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", width: "100%", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", width: "100%" }}>
            <TextField
              style={{ width: "48%" }}
              label="Search by College Name"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              style={{ width: "48%" }}
              label="New College Name"
              variant="outlined"
              size="small"
              value={newCollegeName}
              onChange={(e) => setNewCollegeName(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton style={{ borderRadius: "50%", width: "48px", height: "48px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" } }} onClick={handleAddCollege}>
                      <AddIcon fontSize="large" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <TableContainer component={Paper} style={{ marginTop: "16px", width: "100%" }}>
            <Table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }} aria-label="college management table">
            <TableHead>
  <TableRow>
    <TableCell style={{ fontWeight: "bold", backgroundColor: "#f4f4f4", color: "#1976D2", borderBottom: "2px solid #1976D2", padding: "8px 16px" }}>College Name </TableCell>
    <TableCell style={{ fontWeight: "bold", backgroundColor: "#f4f4f4", color: "#1976D2", borderBottom: "2px solid #1976D2", padding: "8px 16px", paddingRight: "32px", textAlign: "right" }}>Actions</TableCell>
  </TableRow>
</TableHead>



              <TableBody>
                {colleges.map((college) => (
                  <TableRow key={college._id}>
                    <TableCell style={{ borderBottom: "1px solid #e0e0e0", padding: "8px 16px" }}>
                      {college.collegeName}
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid #e0e0e0", padding: "8px 16px", textAlign: "right" }}>
                      <Button startIcon={<EditIcon />} color="primary" onClick={() => handleEdit(college)}>Edit</Button>
                      <Button startIcon={<DeleteIcon />} color="error" onClick={() => handleDelete(college)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            rowsPerPageOptions={[3, 5, 10, 20, 50, 100]}
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ borderTop: "1px solid #e0e0e0", paddingTop: "8px", paddingBottom: "8px" }}
            SelectProps={{
              style: { paddingTop: "4px", paddingBottom: "4px" },
              IconComponent: SearchIcon,
              classes: { icon: { color: "#1976D2", right: "8px" } },
            }}
          />
        </Container>
      )}

      {/* Edit College Modal */}
      <Modal
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      >
        <div style={{ backgroundColor: "white", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", padding: "16px 32px", borderRadius: "8px", width: "300px", textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Edit College
          </Typography>
          <TextField
            label="College Name"
            variant="outlined"
            fullWidth
            value={editedCollegeName}
            onChange={(e) => setEditedCollegeName(e.target.value)}
          />
          <Button color="primary" onClick={confirmEdit}>
            Save
          </Button>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={confirmDeleteModal}
        onClose={() => setConfirmDeleteModal(false)}
      >
        <div style={{ backgroundColor: "white", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", padding: "16px 32px", borderRadius: "8px", width: "300px", textAlign: "center" }}>
          {selectedCollege && (
            <>
              <Typography variant="h6" gutterBottom>
                Confirm Delete?
              </Typography>
              <Typography variant="body1" gutterBottom>
                Are you sure you want to delete the college: <strong>{selectedCollege.collegeName}</strong>?
              </Typography>
              <Button color="error" onClick={confirmDelete}>
                Delete
              </Button>
              <Button onClick={() => setConfirmDeleteModal(false)}>Cancel</Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CollegeManagement;
