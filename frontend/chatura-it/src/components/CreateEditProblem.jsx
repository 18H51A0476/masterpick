import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ApiService from "../http/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    ['link', 'image', 'video'],
    [{ 'align': [] }],
    ['clean'],
  ],
};

const formats = [
  'header',
  'font',
  'size',
  'list',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'script',
  'link',
  'image',
  'video',
  'align',
];

const ProblemCreate = () => {
  const [loading, setLoading] = useState(false);
  const service = new ApiService();
  const [problemInfo, setProblemInfo] = useState({
    title: "",
    slug: "",
    difficulty: "",
    tags: [],
    problemStatement: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    sampleInputs: [""],
    sampleOutputs: [""],
    testcasesInputs: [""],
    testcasesOutputs: [""],
  });

  const handleFieldChange = (field, value) => {
    setProblemInfo({ ...problemInfo, [field]: value });
  };

  const handleTagChange = (selectedTags) => {
    setProblemInfo({ ...problemInfo, tags: selectedTags });
  };

  const handleInputChange = (field, index, value) => {
    const newArray = [...problemInfo[field]];
    newArray[index] = value;
    setProblemInfo({ ...problemInfo, [field]: newArray });
  };

  const addInputOutputField = (field) => {
    setProblemInfo({ ...problemInfo, [field]: [...problemInfo[field], ""] });
  };

  const removeInputOutputField = (field, index) => {
    const newArray = [...problemInfo[field]];
    newArray.splice(index, 1);
    setProblemInfo({ ...problemInfo, [field]: newArray });
  };

  const handleCreateProblem = () => {
    // Here, you can submit the `problemInfo` object to your API or perform any other necessary actions.
    console.log("Creating problem:", problemInfo);
    service
      .post("/problem", problemInfo)
      .then((data) => {
        console.log(data);
        setLoading(false)
        toast.success("Problem created successfully!");
      })
      .catch((err) => {
        setLoading(false)
        console.error("Error creating Batch", err);
        toast.error("Error creating Problem. Please try again later.");
      });
    

    // Reset the form or perform any other post-create actions as needed.
    setProblemInfo({
      title: "",
      slug: "",
      difficulty: "",
      tags: [],
      problemStatement: "",
      inputFormat: "",
      outputFormat: "",
      constraints: "",
      sampleInputs: [""],
      sampleOutputs: [""],
      testcasesInputs: [""],
      testcasesOutputs: [""],
    });
  };

  return (
    <Paper elevation={3} style={{ padding: "16px", maxWidth: "800px", margin: "16px auto" }}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Typography variant="h5">Add New Problem</Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={problemInfo.title}
        onChange={(e) => handleFieldChange("title", e.target.value)}
      />
      <TextField
        label="Slug"
        variant="outlined"
        fullWidth
        margin="normal"
        value={problemInfo.slug}
        onChange={(e) => handleFieldChange("slug", e.target.value)}
      />
      <FormControl variant="outlined" fullWidth margin="normal">
  <InputLabel>Difficulty</InputLabel>
  <Select
    label="Difficulty"
    value={problemInfo.difficulty}
    onChange={(e) => handleFieldChange("difficulty", e.target.value)}
  >
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
<FormControl variant="outlined" fullWidth margin="normal">
  <InputLabel>Tags</InputLabel>
  <Select
    label="Tags"
    multiple
    value={problemInfo.tags}
    onChange={(e) => handleTagChange(e.target.value)}
    renderValue={(selected) => (
      <div>
        {selected.map((tag) => (
          <Chip key={tag} label={tag} style={{ marginRight: 5 }} />
        ))}
      </div>
    )}
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
  </Select>
</FormControl>

      <Typography variant="h6">Problem Statement</Typography>
      <ReactQuill
        value={problemInfo.problemStatement}
        onChange={(value) => handleFieldChange("problemStatement", value)}
        placeholder="Problem Statement"
        modules={modules}
        formats={formats}
      />
      <TextField
        label="Input Format"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        value={problemInfo.inputFormat}
        onChange={(e) => handleFieldChange("inputFormat", e.target.value)}
      />
      <TextField
        label="Output Format"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        value={problemInfo.outputFormat}
        onChange={(e) => handleFieldChange("outputFormat", e.target.value)}
      />
      <Typography variant="h6">Constraints</Typography>
      <ReactQuill
        value={problemInfo.constraints}
        onChange={(value) => handleFieldChange("constraints", value)}
        placeholder="Constraints"
        modules={modules}
        formats={formats}
      />
      <Typography variant="h6">Sample Inputs and Outputs</Typography>
      {problemInfo.sampleInputs.map((input, index) => (
        <div key={index}>
          <TextField
            label={`Sample Input ${index + 1}`}
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            value={input}
            onChange={(e) => handleInputChange("sampleInputs", index, e.target.value)}
          />
          <TextField
            label={`Sample Output ${index + 1}`}
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            value={problemInfo.sampleOutputs[index]}
            onChange={(e) => handleInputChange("sampleOutputs", index, e.target.value)}
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => removeInputOutputField("sampleInputs", index)}
          >
            Remove
          </Button>
          {index === problemInfo.sampleInputs.length - 1 && (
            <Button
              variant="outlined"
              onClick={() => addInputOutputField("sampleInputs")}
            >
              Add Sample
            </Button>
          )}
        </div>
      ))}
      <Typography variant="h6">Testcase Inputs and Outputs</Typography>
      {problemInfo.testcasesInputs.map((input, index) => (
        <div key={index}>
          <TextField
            label={`Testcase Input ${index + 1}`}
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            value={input}
            onChange={(e) => handleInputChange("testcasesInputs", index, e.target.value)}
          />
          <TextField
            label={`Testcase Output ${index + 1}`}
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            value={problemInfo.testcasesOutputs[index]}
            onChange={(e) => handleInputChange("testcasesOutputs", index, e.target.value)}
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => removeInputOutputField("testcasesInputs", index)}
          >
            Remove
          </Button>
          {index === problemInfo.testcasesInputs.length - 1 && (
            <Button
              variant="outlined"
              onClick={() => addInputOutputField("testcasesInputs")}
            >
              Add Testcase
            </Button>
          )}
        </div>
      ))}
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProblem}
        >
          Create Problem
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => console.log("Cancel clicked")}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};

export default ProblemCreate;
