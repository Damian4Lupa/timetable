import React from 'react';

const SearchFrom = props => {

    return (
        <option
            value={props.crs}
            id={props.crs}
            name={props.location}
        >
            {props.location}
        </option>



    )

}

export default SearchFrom