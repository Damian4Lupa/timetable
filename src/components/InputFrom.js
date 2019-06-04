import React, { Component } from 'react';
import SearchFrom from './SearchFrom'
const data = require('./data')

class InputFrom extends Component {
    state = {
        stationInputFrom: '',
        selectedLocations: [],
        selectedLocationsSize: 0,
        selectedFromCrs: '',
    }

    componentDidUpdate(previousProps, previousState) {
        let inputValue = this.state.stationInputFrom //to co wpisuje w input
        let station = [...data.data] //punkt wejściowy

        let selectedLocations = [] //dopasowane lokalizacje po wyszukaniu - do przesłania do state - obiekt z id, locat. i crs po wyszukiwaniu

        let selectedLocationsSize = 0

        if (previousState.stationInputFrom !== this.state.stationInputFrom) {
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
            selectedFromCrs: '',
        })
    }

    handleSelectedLocationForm = event => {
        // console.log(event.target.title)
        this.setState({
            stationInputFrom: event.target.title,
            selectedFromCrs: event.target.id,
        })
    }

    render() {

        const { stationInputFrom, selectedLocationsSize, selectedLocations, selectedFromCrs } = this.state

        let searchForm = selectedLocations.map(item => (
            <SearchFrom
                key={item.id}
                id={item.id}
                location={item.location}
                crs={item.CRS}
            />
        ))


        let showSelect = false
        let errorMessage = ''

        if (stationInputFrom.length >= 3 && selectedFromCrs === '' && selectedLocations.length !== 0) {
            showSelect = true
        } else if (stationInputFrom.length >= 3 && selectedLocations.length === 1) {
            showSelect = false
        } else if (selectedLocations.length > 15) {
            // console.log("reset input")
            this.resetInputFrom()
        } else if (selectedLocations.length === 0 && stationInputFrom.length >= 3) {
            errorMessage = 'There is no such station'
        }
        else showSelect = false


        return (

            <>
                <input
                    name="stationInputFrom"
                    className="validFrom form-control form-control-lg" type="text" placeholder="FROM"
                    value={stationInputFrom}
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