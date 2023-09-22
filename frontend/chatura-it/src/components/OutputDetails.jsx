import React from "react";
import { Typography, Paper } from "@mui/material";

const OutputDetails = ({ outputDetails }) => {
  return (
    <Paper
      elevation={3}
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "1rem",
        padding: "0.5rem",
        borderRadius: "4px",
      }}
    >
      <Typography variant="body2" style={{ marginRight: "1rem" }}>
        Status:{" "}
        <span
          style={{
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            backgroundColor: outputDetails?.status?.description === "Accepted" ? "green" : "red",
            color: "white",
          }}
        >
          {outputDetails?.status?.description}
        </span>
      </Typography>
      <Typography variant="body2" style={{ marginRight: "1rem" }}>
        Memory:{" "}
        <span
          style={{
            fontWeight: "600",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            backgroundColor: "#E5E7EB",
          }}
        >
          {outputDetails?.memory}
        </span>
      </Typography>
      <Typography variant="body2">
        Time:{" "}
        <span
          style={{
            fontWeight: "600",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            backgroundColor: "#E5E7EB",
          }}
        >
          {outputDetails?.time}
        </span>
      </Typography>
    </Paper>
  );
};

export default OutputDetails;
