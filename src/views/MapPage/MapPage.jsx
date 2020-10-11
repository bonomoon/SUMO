import React, { useState, useReducer } from "react";
import moment from "moment";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
// core components
import GoogleMapReact from "google-map-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import styles from "assets/jss/custom/views/mapPage.js";

import Button from "components/CustomButtons/Button";
import SearchBar from "components/Input/SearchBar";
import Footer from "components/Footer/Footer";

const useStyles = makeStyles(styles);

const searchReducer = (state, action) => {
  switch (action.type) {
    case "TYPING":
      return {
        searchValue:
          action.value !== undefined ? action.value : state.searchValue,
      };
    case "SEARCHING":
      return {
        searchValue: state.searchValue,
        isSearching: true,
        searched: true,
      };
    case "SEARCHED":
      return {
        searchValue: state.searchValue,
        isSearching: false,
        searched: true,
      };
    default:
      return state;
  }
};

const searchInitialState = {
  searchValue: "",
  isSearching: false,
  searched: false,
};

function useSearch() {
  const [state, dispatch] = useReducer(searchReducer, searchInitialState);

  const onChangedSearchValue = (text) =>
    dispatch({ type: "TYPING", value: text });
  const startSearch = () => dispatch({ type: "SEARCHED" });

  return {
    searchValue: state.searchValue,
    isSearching: state.isSearching,
    searched: state.searched,
    startSearch,
    onChangedSearchValue,
  };
}

export default function MapPage(props) {
  const search = useSearch();
  const classes = useStyles();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [visibleStartDate, setVisibleStartDate] = useState(false);
  const [visibleEndDate, setVisibleEndDate] = useState(false);

  return (
    <div>
      <div
        className={classes.left}
        style={{
          backgroundColor: search.searched ? "#F3F4F7" : "#00000000",
          boxShadow: search.searched
            ? "0px 0px 8px rgba(0, 0, 0, 0.24), 0px 0px 32px rgba(0, 0, 0, 0.12)"
            : "0px 0px 8px rgba(0, 0, 0, 0), 0px 0px 32px rgba(0, 0, 0, 0)",
        }}
      >
        <div
          style={{
            zIndex: 10000,
          }}
        >
          <SearchBar
            value={search.searchValue}
            onChange={search.onChangedSearchValue}
            onRequestSearch={search.startSearch}
          />
          {search.isSearching ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%)`,
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            search.searched && (
              <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "10px 0",
                    }}
                  >
                    <Button
                      style={localStyles().dataButton}
                      onClick={() => setVisibleStartDate(!visibleStartDate)}
                    >
                      {startDate !== ""
                        ? moment(startDate).format("MMM Do YYYY")
                        : "Start date   "}
                      <Icon style={{ color: "#2979FF", marginLeft: "10px" }}>
                        calendar_today
                      </Icon>
                    </Button>
                    <Button
                      style={localStyles().dataButton}
                      onClick={() => setVisibleEndDate(!visibleEndDate)}
                    >
                      {endDate !== ""
                        ? moment(endDate).format("MMM Do YYYY")
                        : "End date   "}
                      <Icon style={{ color: "#2979FF", marginLeft: "10px" }}>
                        calendar_today
                      </Icon>
                    </Button>
                  </div>
                  {(visibleStartDate || visibleEndDate) && (
                    <div
                      style={{
                        display: "flex",
                        marginBottom: "10px",
                      }}
                    >
                      <Calendar
                        value={
                          visibleStartDate
                            ? startDate || new Date()
                            : endDate || new Date()
                        }
                        onChange={(v) => {
                          if (visibleStartDate) {
                            setStartDate(v);
                            setVisibleStartDate(false);
                          } else {
                            setEndDate(v);
                            setVisibleEndDate(false);
                          }
                        }}
                      />
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button style={localStyles().submitButton}>Submit</Button>
                  </div>
                </div>
                <Divider style={{ margin: "10px 0" }} />
              </div>
            )
          )}
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

const localStyles = (theme) => ({
  sideBar: {
    backgroundColor: "#F3F4F7",
    // color: flag ? "#F3F4F7" : "#00000000",
  },
  dataButton: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white",
    border: "1px solid #2979FF",
    borderRadius: "10px",
    color: "#787885",
    padding: "10px 20px",
    textTransform: "none",
    width: 150,
  },
  submitButton: {
    backgroundColor: "#2979FF",
    padding: "10px 20px",
    textTransform: "none",
    width: 100,
    borderRadius: "10px",
  },
  buttonIcon: {
    marginLeft: "5px",
  }
});
