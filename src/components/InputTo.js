import React, { Component } from "react";
import SearchTo from "./SearchFrom";
const data = require("../data/location.js");

class InputFrom extends Component {
  state = {
    stationInputTo: "",
    selectedLocations: [],
    selectedLocationsSize: 0,
    selectedTo: "",
    selectedToLonlat: "",
  };

  componentDidUpdate(previousProps, previousState) {
    let inputValue = this.state.stationInputTo;
    let station = [...data.data];
    let selectedLocations = [];
    let selectedToLonlat = "";
    let selectedLocationsSize = 0;

    if (previousState.stationInputTo !== this.state.stationInputTo) {
      selectedLocations = station.filter((item) =>
        item.location.includes(inputValue)
      );

      if (selectedLocations.length > 5) {
        selectedLocationsSize = 5;
      } else if (selectedLocations.length === 1) {
        selectedLocationsSize = 2;
      } else {
        selectedLocationsSize = selectedLocations.length;
      }

      if (selectedToLonlat === undefined || this.state.selectedTo === "") {
        selectedToLonlat = null;
      } else if (inputValue.length > 5 && this.state.selectedTo !== "") {
        selectedToLonlat = selectedLocations[0].lonlat;
      }

      this.setState({
        selectedLocations,
        selectedLocationsSize,
        selectedToLonlat,
      });
      this.props.handleSelectedToLonlat(selectedToLonlat);
    }
  }

  handleChangeData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  resetInputFrom = () => {
    this.setState({
      selectedLocations: [],
      selectedLocationsSize: 0,
      selectedTo: "",
      selectedToLonlat: "",
    });
  };

  handleSelectedLocationForm = (event) => {
    let stationInputTo = event.target.title;
    let selectedTo = event.target.id;

    this.setState({
      stationInputTo,
      selectedTo,
    });
    this.props.handleInputTo(selectedTo);
  };

  render() {
    const {
      stationInputTo,
      selectedLocationsSize,
      selectedLocations,
      selectedTo,
    } = this.state;

    let searchForm = selectedLocations.map((item) => (
      <SearchTo
        key={item.location}
        id={item.location}
        location={item.location}
        lonlat={item.lonlat}
      />
    ));

    let showSelect = false;
    let errorMessage = "";

    if (
      stationInputTo.length >= 3 &&
      selectedTo === "" &&
      selectedLocations.length !== 0
    ) {
      showSelect = true;
    } else if (stationInputTo.length >= 3 && selectedLocations.length === 1) {
      showSelect = false;
    } else if (selectedLocations.length > 15) {
      this.resetInputFrom();
    } else if (selectedLocations.length === 0 && stationInputTo.length >= 3) {
      errorMessage = "There is no such station";
    } else showSelect = false;

    return (
      <>
        <input
          name="stationInputTo"
          className="validTo form-control form-control-lg"
          type="text"
          placeholder="TO"
          value={stationInputTo}
          onChange={this.handleChangeData}
        />

        <div className="form-group mt-3">
          {showSelect && (
            <select
              className="custom-select custom-select-lg"
              size={selectedLocationsSize}
              onClick={this.handleSelectedLocationForm}
            >
              {searchForm}
            </select>
          )}
          <center>{errorMessage}</center>
        </div>
      </>
    );
  }
}

export default InputFrom;
