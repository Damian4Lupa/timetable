import React from 'react';

const SearchFrom = props => {

    return (
        <option
            value={props.lonlat}
            id={props.id}
            title={props.location}
        // onClick={props.chosen}
        >
            {props.location}
        </option>
    )
}

export default SearchFrom