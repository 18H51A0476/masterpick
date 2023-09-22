import React from "react";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <textarea
      rows={5}
      value={customInput}
      onChange={(e) => setCustomInput(e.target.value)}
      placeholder={`Custom input`}
      style={{
        outline: "none",
        width: "97%", // Set a fixed width value
        height: "100px", // Set a fixed height value
        border: "2px solid black",
        borderRadius: "4px",
        padding: "8px",
        backgroundColor: "white",
        marginTop: "8px",
        resize: "none", // Prevent resizing
      }}
    />
  );
};

export default CustomInput;
