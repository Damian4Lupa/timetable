import React from "react";

const SearchTo = (props) => {
  return (
    <option value={props.lonlat} id={props.location} title={props.location}>
      {props.location}
    </option>
  );
};

export default SearchTo;
