import React from "react";
import { Typography, Paper } from "@mui/material";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // Compilation error
      return (
        <pre
          style={{
            padding: "0.25rem 0.5rem",
            fontSize: "0.75rem",
            color: "#ff0000",
          }}
        >
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre
          style={{
            padding: "0.25rem 0.5rem",
            fontSize: "0.75rem",
            color: "#00ff00",
          }}
        >
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre
          style={{
            padding: "0.25rem 0.5rem",
            fontSize: "0.75rem",
            color: "#ff0000",
          }}
        >
          Time Limit Exceeded
        </pre>
      );
    } else {
      return (
        <pre
          style={{
            padding: "0.25rem 0.5rem",
            fontSize: "0.75rem",
            color: "#ff0000",
          }}
        >
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };

  return (
    <>
      <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
        Output
      </Typography>
      <Paper
        elevation={3}
       
        style={{
          outline: "none",
          maxWidth: "700px", // Set a fixed width value
          height: "100px", // Set a fixed height value
          border: "2px solid black",
          borderRadius: "4px",
          padding: "8px",
          backgroundColor: "#1e293b",
          marginTop: "8px",
          resize: "none", // Prevent resizing
          overflow:"auto"
        }}
      >
        {outputDetails ? <>{getOutput()}</> : null}
      </Paper>
    </>
  );
};

export default OutputWindow;
