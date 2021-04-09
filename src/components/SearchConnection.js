import React, { Component } from "react";
import $ from "jquery";
import InputFrom from "./InputFrom";
import InputTo from "./InputTo";
import DateAndTime from "./DateAndTime";
import FoundConnection from "./FoundConnection";

class SearchConnection extends Component {
  state = {
    date: "",
    time: "",

    selectedFrom: "",
    selectedFromLonlat: "",

    selectedTo: "",
    selectedToLonlat: "",

    foundConnection: [],
    sortConnection: [],

    changeBackground: false,
    changeBackgroundEnd: false,
    fotoHeaderIndex: 5,
    show_FoundConnection: false,
    errorConnetion: false,
    loadingData: false,
    searchIcon: false,
    windowWidth: 0,
  };

  interval = 0;

  componentDidMount = () => {
    this.checkWindowWidth();
    this.interval = setInterval(() => {
      this.generateIndex();
    }, 20000);
  };

  componentDidUpdate = (prevProps, prevState) => {
    window.addEventListener("resize", this.checkWindowWidth);

    if (prevState.windowWidth !== this.state.windowWidth) {
      this.handleSearchIcon(this.state.windowWidth);
    }

    if (prevState.selectedFrom !== this.state.selectedFrom) {
      clearInterval(this.interval);
    }
  };

  handleSearchIcon = (windowWidth) => {
    if (windowWidth < 1000) {
      this.setState({
        searchIcon: true,
      });
    } else {
      this.setState({
        searchIcon: false,
      });
    }
  };

  checkWindowWidth = () => {
    let windowWidth = 0;
    windowWidth = $(window).width();
    this.setState({
      windowWidth,
    });
  };

  downloadTimetable = () => {
    const { selectedFromLonlat, selectedToLonlat, time, date } = this.state;

    const API = `https://transportapi.com/v3/uk/public/journey/from/lonlat:${selectedFromLonlat}/to/lonlat:${selectedToLonlat}/at/${date}/${time}.json?app_id=66901113&app_key=65d3a215e85ef5745c85521230c46e42&modes=train-bus&service=southeast`;

    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .catch((error) =>
        alert(`\nEasy, it's just a error \n${error} \nRefresh the page `)
      )
      .then((response) => response.json())
      .then((data) => {
        let test = this.sortTable(data.routes);

        console.log("sort table in parent", test);

        this.setState({
          foundConnection: data,
          sortConnection: test,
          show_FoundConnection: true,
          loadingData: false,
        });
      });
  };

  generateIndex = () => {
    let fotoHeaderIndex = 0;
    fotoHeaderIndex = Math.floor(Math.random() * 5 + 1);

    this.setState({
      fotoHeaderIndex,
    });
  };

  handleSelectedFrom = (selectedFrom) => {
    this.setState({
      selectedFrom,
    });
  };

  handleSelectedFromLonlat = (selectedFromLonlat) => {
    this.setState({
      selectedFromLonlat,
    });
  };

  handleInputTo = (selectedTo) => {
    this.setState({
      selectedTo,
    });
  };

  handleSelectedToLonlat = (selectedToLonlat) => {
    this.setState({
      selectedToLonlat,
    });
  };

  handleDateAndTime = (date, time) => {
    this.setState({
      date,
      time,
    });
  };

  handleErrorConnetion = () => {
    this.setState({
      errorConnetion: true,
    });

    setTimeout(() => {
      this.setState({
        errorConnetion: false,
      });
    }, 2500);
  };

  handleButtonLoading = () => {
    this.setState({
      loadingData: true,
    });
  };

  handleButtonSearch = () => {
    const { selectedFrom, selectedTo } = this.state;

    if (selectedFrom !== "" && selectedTo !== "") {
      this.handleButtonLoading();
      this.downloadTimetable();
    } else {
      this.handleErrorConnetion();
    }
  };

  changeDisplay = () => {
    if (this.state.show_FoundConnection) {
      if ($("#foto-header").hasClass("foto-header-1")) {
        $("#foto-header").attr("class", "display-none");
      } else if ($("#foto-header").hasClass("foto-header-2")) {
        $("#foto-header").attr("class", "display-none");
      } else if ($("#foto-header").hasClass("foto-header-3")) {
        $("#foto-header").attr("class", "display-none");
      } else if ($("#foto-header").hasClass("foto-header-4")) {
        $("#foto-header").attr("class", "display-none");
      } else if ($("#foto-header").hasClass("foto-header-5")) {
        $("#foto-header").attr("class", "display-none");
      }
    }
  };

  sortTable = (connection) => {
    function sortObject(obj) {
      var arr = [];
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          let number = parseInt(obj[prop].duration);
          arr.push({
            key: prop,
            value: number,
            duration: obj[prop].duration,
            mode: obj[prop].mode,
            line_name: obj[prop].line_name,
            destination: obj[prop].destination,
            from_point_name: obj[prop].from_point_name,
            to_point_name: obj[prop].to_point_name,
            route_parts: obj[prop].route_parts,
            departure_time: obj[prop].departure_time,
            arrival_time: obj[prop].arrival_time,
            arrival_date: obj[prop].arrival_date,
          });
        }
      }
      arr.sort(function (a, b) {
        return a.value - b.value;
      });

      return arr;
    }

    let arr = sortObject(connection);

    console.log("sort", arr);

    return arr;
  };

  render() {
    const {
      show_FoundConnection,
      errorConnetion,
      loadingData,
      fotoHeaderIndex,
      searchIcon,
      selectedTo,
      selectedFrom,
    } = this.state;

    let errorMessageStyle = $("#foto-header").hasClass("display-none")
      ? "text-center mt-4 text-muted"
      : "text-center mt-4 text-white";

    const show_error = (
      <h4 className={errorMessageStyle}>
        Please select the start and end stations correctly
      </h4>
    );

    const buttonLargeScreen = (
      <button
        type="button"
        className="btn btn-danger form-control form-control-lg"
        onClick={this.handleButtonSearch}
      >
        Find your connection
      </button>
    );

    const buttonLargeScreenDisabled = (
      <button
        type="button"
        className="btn btn-danger form-control form-control-lg disabled"
      >
        Find your connection
      </button>
    );

    const buttonSmallScreen = (
      <button
        type="button"
        className="btn btn-danger form-control form-control-lg button-small-screen"
        onClick={this.handleButtonSearch}
      ></button>
    );

    const buttonSmallScreenDisabled = (
      <button
        type="button"
        className="btn btn-danger form-control form-control-lg button-small-screen disabled"
      ></button>
    );

    const SmallScreen = selectedFrom === selectedTo ? buttonSmallScreenDisabled : buttonSmallScreen;

    const LargeScreen = selectedFrom === selectedTo ? buttonLargeScreenDisabled : buttonLargeScreen;

    return (
      <div
        id="foto-header"
        className={`foto-header-${fotoHeaderIndex}`}
        display={this.changeDisplay()}
      >
        <img className="foto-background" alt="foto-background" />

        <div className="container">
          <div className="row marginTop">
            <div className="col">
              <InputFrom
                handleSelectedFrom={this.handleSelectedFrom}
                handleSelectedFromLonlat={this.handleSelectedFromLonlat}
              />
            </div>
            <div className="col">
              <InputTo
                handleInputTo={this.handleInputTo}
                handleSelectedToLonlat={this.handleSelectedToLonlat}
              />
            </div>
            <div className="col">
              <DateAndTime handleDateAndTime={this.handleDateAndTime} />
            </div>
            <div className="col">
              {loadingData || (searchIcon ? SmallScreen : LargeScreen)}

              {loadingData && (
                <button
                  type="button"
                  className="btn btn-danger form-control form-control-lg"
                >
                  <span
                    className="spinner-border spinner-border-sm mr-2 mb-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              )}
            </div>
          </div>
          <div>{errorConnetion && show_error}</div>

          {show_FoundConnection && (
            <FoundConnection
              connection={this.state.foundConnection}
              sortConnection={this.state.sortConnection}
            />
          )}
        </div>
      </div>
    );
  }
}

export default SearchConnection;
