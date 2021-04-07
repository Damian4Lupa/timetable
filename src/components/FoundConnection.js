import React, { Component } from "react";
import bus from "../components/img/bus.svg";
import foot from "../components/img/foot.svg";
import taxi from "../components/img/taxi.svg";
import train from "../components/img/train.svg";

class FoundConnection extends Component {
  state = {
    showButton: false,
  };

  showPrice = (mode, duration) => {
    let price = "";
    let number = parseInt(duration);

    if (mode === "foot" || mode === "taxi") {
      return "-";
    }

    if (mode === "bus" || mode === "dlr" || mode === "tube") {
      price = 2;
    } else if (mode === "train" && number >= 6 && number < 8) {
      price = 30;
    } else if (mode === "train" && number >= 3 && number < 6) {
      price = 20;
    } else if (mode === "train" && number >= 1 && number < 3) {
      price = 10;
    } else if (mode === "train" && number >= 0 && number < 1) {
      price = 5;
    }
    return price + "£";
  };

  shortenTables = () => {
    let connection = this.props.sortConnection[0].route_parts;
    let connectionLength = connection.length - 1;

    let array = [
      [1, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      [2, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      [3, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      [4, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      [5, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      [6, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      [7, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      [8, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      [9, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      [10, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      [11, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      [12, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      [13, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      [14, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      [15, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ];

    let result = array.slice(0, connectionLength);
    return result;
  };

  totalCost = (table) => {
    let cost = 0;

    for (let i = 0; i < table.length; i++) {
      let array = table[i][7];
      let number = 0;

      if (array.length === 2) {
        let newArray = array.substring(0, 1);
        number = +newArray;
      } else if (array.length === 3) {
        let newArray = array.substring(0, 2);
        number = +newArray;
      }
      cost += number;
    }
    return cost;
  };

  travelSummary = (duration, table) => {
    let hours = duration.substring(0, 2);
    let hoursNumber = +hours;
    let minutes = duration.substring(3, 5);
    let minutesNumber = +minutes;

    const result = (
      <span className="travelSummary">
        Total travel time: {`${hoursNumber}h ${minutesNumber}m`}, total cost:{" "}
        {this.totalCost(table)}£.
      </span>
    );
    return result;
  };

  travelTime = (duration) => {
    let hours = duration.substring(0, 2);
    let hoursNumber = +hours;
    let minutes = duration.substring(3, 5);
    let minutesNumber = +minutes;
    let result = "";

    if (hoursNumber === 0) {
      result = `${minutesNumber}m`;
    } else {
      result = `${hoursNumber}h ${minutesNumber}m`;
    }

    return result;
  };

  showButtonTrue = () => {
    this.setState({
      showButton: true,
    });
  };

  showButtonFalse = () => {
    this.setState({
      showButton: false,
    });
  };

  changeStyle = (duration) => {
    let style = "";

    if (duration === "train") {
      if (this.state.showButton) {
        style = "buyTicked";
      } else {
        style = "#f8f9fa";
      }
    } else {
      style = "#f8f9fa";
    }

    return style;
  };

  sortTable = () => {
    let connection = this.props.connection.routes;

    function sortObject(obj) {
      var arr = [];
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          let number = parseInt(obj[prop].duration);
          arr.push({
            key: prop,
            value: number,
            duration: obj[prop].duration,
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
    var arr = sortObject(connection);
  };

  modeTravelIcon = (mode, lineName) => {
    let view = "";
    let height = "25";

    if (mode == "taxi") {
      view = <img src={taxi} alt="" height={height} />;
    } else if (mode == "train") {
      view = <img src={train} alt="" height={height} />;
    } else if (mode == "bus") {
      view = (
        <span>
          <img src={bus} alt="" height={height} /> <br /> line: {lineName}
        </span>
      );
    } else {
      view = <img src={foot} alt="" height={height} />;
    }
    return view;
  };

  render() {
    let showButton = this.state.showButton;
    let connection = this.props.sortConnection[0].route_parts;
    let duration = this.props.sortConnection[0].duration;
    let table = this.shortenTables();
    let NewConnection = [...connection];

    for (let i = 0; i < table.length; i++) {
      const buttonOn = <span>buy a ticket</span>;
      const buttonOff = (
        <span>
          {this.showPrice(NewConnection[i].mode, NewConnection[i].duration)}
        </span>
      );
      let content = showButton ? buttonOn : buttonOff;

      let duration =
        NewConnection[i].mode === "train"
          ? content
          : this.showPrice(NewConnection[i].mode, NewConnection[i].duration);

      table[i][1] = NewConnection[i].from_point_name;
      table[i][2] = NewConnection[i].to_point_name;
      table[i][3] = this.modeTravelIcon(
        NewConnection[i].mode,
        NewConnection[i].line_name
      );
      table[i][4] = `dep. ${NewConnection[i].departure_time}`;
      table[i][9] = `arr. ${NewConnection[i].arrival_time}`;
      table[i][5] = this.travelTime(NewConnection[i].duration);
      table[i][6] = duration;
      table[i][7] = this.showPrice(
        NewConnection[i].mode,
        NewConnection[i].duration
      );
      table[i][8] = NewConnection[i].mode;
    }

    const row = table.map((table) => (
      <tbody>
        <tr>
          <td>{table[0]}</td>
          <td>{table[1]}</td>
          <td>{table[2]}</td>
          <td>{table[3]}</td>
          <td>
            {table[4]}
            <br />
            {table[9]}
          </td>
          <td>{table[5]}</td>
          <td
            className={this.changeStyle(table[8])}
            onMouseLeave={this.showButtonFalse}
            onMouseEnter={this.showButtonTrue}
          >
            {table[6]}
          </td>
        </tr>
      </tbody>
    ));

    return (
      <>
        <table className="table table-hover text-center my-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col-2">From</th>
              <th scope="col-2">To</th>
              <th scope="col-3">Connection</th>
              <th scope="col-5">Time</th>
              <th scope="col">Duration</th>
              <th scope="col">Normal price</th>
            </tr>
          </thead>
          {row}
        </table>
        {this.travelSummary(duration, table)}
      </>
    );
  }
}

export default FoundConnection;
