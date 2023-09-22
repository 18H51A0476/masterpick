import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { Paper } from "@mui/material";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");
  const [editorHeight, setEditorHeight] = useState("50vh"); // Default height

  useEffect(() => {
    // Calculate half of the screen height
    const screenHeight = window.innerHeight || document.documentElement.clientHeight;
    const halfScreenHeight = screenHeight / 2;

    // Set the editor's height based on half of the screen height
    setEditorHeight(`${halfScreenHeight}px`);
  }, []);

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <Paper
      elevation={8}
      style={{
        height: editorHeight,
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <Editor
        height="100%" // Set height to 100% for the scrolling effect
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </Paper>
  );
};

export default CodeEditorWindow;
