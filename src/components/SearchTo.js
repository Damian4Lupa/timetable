import React from 'react';

const SearchTo = props => {

    return (
        <option
            value={props.crs}
            id={props.crs}
            title={props.location}
            // onClick={props.chosen}
        >
            {props.location}
        </option>
    )

}

export default SearchTo