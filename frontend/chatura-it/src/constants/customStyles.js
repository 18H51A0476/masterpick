export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    minWidth: "12rem",
    borderRadius: "999px",
    color: "#fff",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    backgroundColor: "#ffd633",
    cursor: "pointer",
    border: "2px solid #357ABD",
    boxShadow: "none",
    ":hover": {
      backgroundColor: "#ccaa00", // A darker shade of the background color
      border: "2px solid #357ABD",
    },
  }),
  option: (styles) => ({
    ...styles,
    color: "#000",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    width: "100%",
    backgroundColor: "#fff",
    ":hover": {
      backgroundColor: "#F3F4F6",
      color: "#000",
      cursor: "pointer",
    },
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "#fff",
    maxWidth: "14rem",
    // border: "2px solid #357ABD",
    borderRadius: "999px",
    boxShadow: "none",
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: "#000",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#fff", // Set selected option text color to white
  }),
};
