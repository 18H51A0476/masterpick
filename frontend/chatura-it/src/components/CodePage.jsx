import React, { useEffect, useState } from "react";
import axios from "axios";
import { languageOptions } from "../constants/languageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/userKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguageDropdown";
import { IconButton, Button } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CodeEditorWindow from "./CodeEditorWindow";

const Landing = () => {
  const [code, setCode] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [dividerPosition, setDividerPosition] = useState(50);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    setProcessing(true);
    console.log("sub lan",language)
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };
    axios
      .request(options)
      .then(function (response) {
        const token = response?.data?.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        let status = err?.response?.status;
        if (status === 429) {
          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to set up your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
      }
    } catch (err) {
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    if (["light", "vs-dark"].includes(th.value)) {
      setTheme(th);
    } else {
      defineTheme(th.value).then((_) => setTheme(th));
    }
  }

  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
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
      <div style={{ display: "flex" }}>
        {/* Left Part (Problem Statement) */}
        <div
          style={{
            flex: "1",
            padding: "1rem",
            backgroundColor: "#E5E7EB",
          }}
        >
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#E5E7EB",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Check Prime</h1>
            </div>
            <div>
              <span
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#1E40AF",
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  borderRadius: "9999px",
                }}
              >
                Easy
              </span>
            </div>
          </div>

          {/* Problem Statement Content */}
          <div style={{ padding: "1rem", backgroundColor: "#E5E7EB" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
              Problem Statement
            </h1>
            <p>Write a program to check if a given number is prime or not.</p>
          </div>

          {/* Input Format */}
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#E5E7EB",
              marginTop: "1rem",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>Input Format</h2>
            <p>
              The input consists of a single integer <code>n</code> (1 ≤{" "}
              <code>n</code> ≤ 10^9).
            </p>
          </div>

          {/* Output Format */}
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#E5E7EB",
              marginTop: "1rem",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>Output Format</h2>
            <p>
              Print "Prime" if the input number is prime; otherwise, print "Not
              Prime."
            </p>
          </div>

          {/* Constraints */}
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#E5E7EB",
              marginTop: "1rem",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>Constraints</h2>
            <ul style={{ listStyleType: "disc", paddingLeft: "1rem" }}>
              <li>1 ≤ <code>n</code> ≤ 10^9</li>
            </ul>
          </div>

          {/* Sample Input */}
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#E5E7EB",
              marginTop: "1rem",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>Sample Input</h2>
            <pre
              style={{
                backgroundColor: "#D1D5DB",
                padding: "0.5rem",
                borderRadius: "0.25rem",
              }}
            >
              7
            </pre>
          </div>

          {/* Sample Output */}
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#E5E7EB",
              marginTop: "1rem",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>Sample Output</h2>
            <pre
              style={{
                backgroundColor: "#D1D5DB",
                padding: "0.5rem",
                borderRadius: "0.25rem",
              }}
            >
              Prime
            </pre>
          </div>
        </div>

        {/* Right Part (Code Editor) */}
        <div
          style={{
            flex: "1",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <LanguagesDropdown onSelectChange={onSelectChange} />
            <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
          </div>

          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
                marginBottom: "1rem",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div>
                {outputDetails && <OutputDetails outputDetails={outputDetails} />}
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Button
                  onClick={handleCompile}
                  disabled={!code}
                  variant="contained"
                  color="primary"
                >
                  {processing ? "Processing..." : "Compile and Execute"}
                </Button>
                <Button
                  onClick={handleCompile}
                  disabled={!code}
                  variant="contained"
                  color="success"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
          <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
          <OutputWindow outputDetails={outputDetails} />
        </div>
      </div>
    </>
  );
};

export default Landing;
