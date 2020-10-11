import React, { useState, useReducer } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GoogleMapReact from "google-map-react";

import styles from "assets/jss/custom/views/mapPage.js";

import SearchBar from "components/Input/SearchBar";
import Footer from "components/Footer/Footer";

const useStyles = makeStyles(styles);

const searchReducer = (state, action) => {
  switch (action.type) {
    case "SEARCHING":
      return {
        searchValue:
          action.value !== undefined ? action.value : state.searchValue,
        isSearching: true,
      };
    case "SEARCHED":
      return {
        searchValue: action.value,
        isSearching: false,
      };
    default:
      return state;
  }
};

const searchInitialState = {
  searchValue: "",
  isSearching: true,
};

function useSearch() {
  const [state, dispatch] = useReducer(searchReducer, searchInitialState);

  const onChangedSearchValue = (text) =>
    dispatch({ type: "SEARCHING", value: text });
  const startSearch = () => dispatch({ type: "SEARCHING" });
  const completeSearch = (searchValue) => {
    if (searchValue !== undefined || state.searchValue !== "") {
      dispatch({
        type: "SEARCHED",
        value: searchValue ? searchValue : state.searchValue,
      });
    }
  };

  return {
    searchValue: state.searchValue,
    isSearching: state.isSearching,
    currentSearchList: state.currentSearchList,
    startSearch,
    completeSearch,
    onChangedSearchValue,
  };
}

export default function MapPage(props) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <div
        className={classes.left}
        style={searchValue === "" ? localStyles.disabledSideBar : {}}
      >
        <div
          style={{
            zIndex: 10000,
          }}
        >
          <SearchBar
            value={searchValue}
            onChange={(v) => setSearchValue(v)}
            onRequestSearch={() => console.log(searchValue)}
          />
        </div>
      </div>
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
      </div>
      <Footer whiteFont />
    </div>
  );
}

const localStyles = (action) => ({
  sideBar: {
    backgroudColor: "#00000000",
    color: "#00000000",
  },
});
