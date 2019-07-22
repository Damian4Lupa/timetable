import React from 'react';

const SearchTo = props => {

    return (
        <option
            value={props.lonlat}
            id={props.location}
            title={props.location}
        // onClick={props.chosen}
        >
            {props.location}
        </option>
    )

}

export default SearchTo