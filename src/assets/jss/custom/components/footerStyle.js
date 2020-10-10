import { container, primaryColor } from "assets/jss/material-kit-react.js";

const footerStyle = {
  center: {
    float: "center!important",
    display: "block",
    margin: 0,
  },
  footer: {
    padding: "0.9375rem 0",
    textAlign: "center",
    display: "flex",
    zIndex: "2",
    left: "50%",
    bottom: 0,
    position: "absolute",
    transform: `translate(-50%, 0)`,
  },
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent",
  },
  footerWhiteFont: {
    "&,&:hover,&:focus": {
      color: "#FFFFFF",
    },
  },
  container,
  icon: {
    width: "80px",
    height: "auto",
    position: "relative",
    top: "3px",
  },
};

export default footerStyle;
