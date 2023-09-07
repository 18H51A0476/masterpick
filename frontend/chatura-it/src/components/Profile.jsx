import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  Button,
  MenuItem
} from "@mui/material";
import ApiService from "../http/ApiService";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [editableFields, setEditableFields] = useState({
    phoneNumber: "",
    rollNumber: "",
    branch: "",
    college: "",
    linkedin: "",
  });
  const service = new ApiService();

  useEffect(() => {
    setLoading(true);
    service
      .get("/user/profile")
      .then((data) => {
        console.log("User Data:", data);
        setProfileData(data.user);
        setEditableFields({
          phoneNumber: data.user.phoneNumber || "",
          rollNumber: data.user.rollNumber || "",
          branch: data.user.branch || "",
          college: data.user.college || "",
          linkeden: data.user.linkeden || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error: ", err);
      });
  }, []);

  const handleSave = () => {
    setLoading(true);
    service
      .put("/user/profile/edit",{...editableFields})
      .then((data) => {
        console.log("User Data:", data);
        service
      .get("/user/profile")
      .then((data) => {
        console.log("User Data:", data);
        setProfileData(data.user);
        setEditableFields({
          phoneNumber: data.user.phoneNumber || "",
          rollNumber: data.user.rollNumber || "",
          branch: data.user.branch || "",
          college: data.user.college || "",
          linkeden: data.user.linkeden || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error: ", err);
      });
        setLoading(false);
        
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error: ", err);
      });
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    color: "white",
    backgroundColor: "#2B3945",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    marginTop:"1%",
    zIndex: 2
  };

  const avatarStyle = {
    width: "120px",
    height: "120px",
    marginBottom: "16px",
  };

  const contentContainerStyle = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    color: "#d3d3d3",
    backgroundColor: "#2B3945",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    padding: "16px",
  };

  const editableFieldStyle = {
    marginBottom: "16px",
  };

  const horizontalLineStyle = {
    width: "100%",
    margin: "16px 0",
    border: "0",
    borderTop: "1px solid #e0e0e0",
  };

  const saveButtonStyle = {
    marginTop: "16px",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#354f52",
        color: "white",
        padding: "32px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {loading ? (
        <CircularProgress size={60} />
      ) : (
        <>
          {profileData && Object.keys(profileData).length > 0 ? (
            <>
              <div
                style={{
                  flex: "0 0 25%",
                  marginRight: "16px",
                  flex: "1",
                  marginRight: 0,
                  marginBottom: "16px",
                }}
              >
                <Card style={cardStyle}>
                  <Avatar
                    alt="User Picture"
                    src={profileData.picture}
                    style={avatarStyle}
                  />
                  <CardContent>
                    <Typography variant="h5">{profileData.name}</Typography>
                    <Typography>{profileData.email}</Typography>
                    <Typography>Role: {profileData.role}</Typography>
                    <hr style={horizontalLineStyle} />
                    <TextField
                      label="Roll Number"
                      variant="outlined"
                      fullWidth
                      style={editableFieldStyle}
                      value={editableFields.rollNumber}
                      onChange={(e) =>
                        setEditableFields({
                          ...editableFields,
                          rollNumber: e.target.value,
                        })
                      }
                    />
                    <TextField
                      label="Branch"
                      variant="outlined"
                      fullWidth
                      style={editableFieldStyle}
                      value={editableFields.branch}
                      onChange={(e) =>
                        setEditableFields({
                          ...editableFields,
                          branch: e.target.value,
                        })
                      }
                    />
                    <TextField
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      style={editableFieldStyle}
                      value={editableFields.phoneNumber}
                      onChange={(e) =>
                        setEditableFields({
                          ...editableFields,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                    <TextField
                      label="College"
                      variant="outlined"
                      fullWidth
                      select
                      style={editableFieldStyle}
                      value={editableFields.college}
                      onChange={(e) =>
                        setEditableFields({
                          ...editableFields,
                          college: e.target.value,
                        })
                      }
                    >
                      <MenuItem value="college1">College 1</MenuItem>
                      <MenuItem value="college2">College 2</MenuItem>
                    </TextField>
                    <TextField
                      label="Linkden Profile"
                      variant="outlined"
                      fullWidth
                      style={editableFieldStyle}
                      value={editableFields.linkeden}
                      onChange={(e) =>
                        setEditableFields({
                          ...editableFields,
                          linkeden: e.target.value,
                        })
                      }
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      style={saveButtonStyle}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div style={contentContainerStyle}>
                <Typography variant="h6">Work in Progress</Typography>
                {/* Add your work in progress content here */}
              </div>
            </>
          ) : (
            <Typography variant="body1">No user data available.</Typography>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
