import React, { Component } from 'react';
import SearchTo from './SearchFrom'
const data = require('./data')

class InputFrom extends Component {
    state = {
        stationInputTo: '',
        selectedLocations: [],
        selectedLocationsSize: 0,
        selectedToCrs: '',
    }

    componentDidUpdate(previousProps, previousState) {
        let inputValue = this.state.stationInputTo //to co wpisuje w input
        let station = [...data.data] //punkt wejściowy

        let selectedLocations = [] //dopasowane lokalizacje po wyszukaniu - do przesłania do state - obiekt z id, locat. i crs po wyszukiwaniu

        let selectedLocationsSize = 0

        if (previousState.stationInputTo !== this.state.stationInputTo) {
            selectedLocations = station.filter(item => item.location.includes(inputValue))

            if (selectedLocations.length > 5) {
                selectedLocationsSize = 5
            } else if (selectedLocations.length === 1) {
                selectedLocationsSize = 2
            } else {
                selectedLocationsSize = selectedLocations.length
            }

            this.setState({
                selectedLocations,
                selectedLocationsSize
            })
        }
    }

    handleChangeData = event => {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        })
    }

    resetInputFrom = () => {
        this.setState({
            selectedLocations: [],
            selectedLocationsSize: 0,
            selectedToCrs: '',
        })
    }

    handleSelectedLocationForm = event => {
        // console.log(event.target.title)
        this.setState({
            stationInputTo: event.target.title,
            selectedToCrs: event.target.id,
        })
    }

    render() {

        const { stationInputTo, selectedLocationsSize, selectedLocations, selectedToCrs } = this.state

        let searchForm = selectedLocations.map(item => (
            <SearchTo
                key={item.id}
                id={item.id}
                location={item.location}
                crs={item.CRS}
            />
        ))


        let showSelect = false
        let errorMessage = ''

        if (stationInputTo.length >= 3 && selectedToCrs === '' && selectedLocations.length !== 0) {
            showSelect = true
        } else if (stationInputTo.length >= 3 && selectedLocations.length === 1) {
            showSelect = false
        } else if (selectedLocations.length > 15) {
            // console.log("reset input")
            this.resetInputFrom()
        } else if (selectedLocations.length === 0 && stationInputTo.length >= 3) {
            errorMessage = 'There is no such station'
        }
        else showSelect = false


        return (

            <>
                <input 
                name="stationInputTo" 
                className="validTo form-control form-control-lg" type="text" placeholder="TO" 
                value={stationInputTo} 
                onChange={this.handleChangeData} 
                />

                <div className="form-group mt-3">

                    {showSelect && <select className="custom-select custom-select-lg"
                        size={selectedLocationsSize}
                        onClick={this.handleSelectedLocationForm}
                    >
                        {searchForm}

                    </select>}
                    <center>{errorMessage}</center>

                </div>
            </>
        );
    }
}

export default InputFrom;