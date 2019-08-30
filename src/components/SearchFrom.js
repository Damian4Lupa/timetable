import React from 'react';

const SearchFrom = props => {

    return (
        <option
            value={props.lonlat}
            id={props.id}
            title={props.location}
        >
            {props.location}
        </option>
    )
}

export default SearchFrom