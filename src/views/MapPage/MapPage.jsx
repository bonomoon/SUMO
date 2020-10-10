import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GoogleMapReact from "google-map-react";

import styles from "assets/jss/custom/views/mapPage.js";

import CustomInput from "components/CustomInput/CustomInput.js";
import Footer from "components/Footer/Footer";

const useStyles = makeStyles(styles);

export default function MapPage(props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.container}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_API_KEY,
            language: "en",
          }}
          defaultCenter={{
            lat: 36.395319,
            lng: 127.403476,
          }}
          defaultZoom={5}
          style={{ width: "100%", height: "100%" }}
          options={() => {
            return { mapTypeId: "hybrid" };
          }}
        />
        <div>
          <div>
            <CustomInput />
          </div>
        </div>
      </div>
      {/* <Footer whiteFont /> */}
      <Footer whiteFont />
    </div>
  );
}
