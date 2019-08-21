import React, { Component } from 'react';
import SearchFrom from './SearchFrom'
// const data = require('./data')
const data = require('../data/location.js')

class InputFrom extends Component {
    state = {
        stationInputFrom: '',
        selectedLocations: [],
        selectedLocationsSize: 0,
        selectedFrom: '',
        selectedFromLonlat: ''
    }

    componentDidUpdate(previousProps, previousState) {
        let inputValue = this.state.stationInputFrom //to co wpisuje w input
        let station = [...data.data] //punkt wejściowy

        let selectedLocations = [] //dopasowane lokalizacje po wyszukaniu - do przesłania do state - obiekt z id, locat. i crs po wyszukiwaniu
        let selectedFromLonlat = ''
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

            if (selectedFromLonlat === undefined || this.state.selectedFrom === '') {
                selectedFromLonlat = null
            } else if (inputValue.length > 5 && this.state.selectedFrom !== '') {
                selectedFromLonlat = selectedLocations[0].lonlat
            }

            this.setState({
                selectedLocations,
                selectedLocationsSize,
                selectedFromLonlat
            })
            this.props.handleSelectedFromLonlat(selectedFromLonlat)
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
            selectedFrom: '',
            selectedFromLonlat: ''
        })
    }

    handleSelectedLocationForm = event => {

        let selectedFrom = event.target.id
        let stationInputFrom = event.target.title

        this.setState({
            stationInputFrom,
            selectedFrom,

        })
        this.props.handleSelectedFrom(selectedFrom)
    }

    render() {

        const { stationInputFrom, selectedLocationsSize, selectedLocations, selectedFrom } = this.state

        let searchForm = selectedLocations.map(item => (
            <SearchFrom
                key={item.location}
                id={item.location}
                location={item.location}
                lonlat={item.lonlat}
            />
        ))


        let showSelect = false
        let errorMessage = ''

        if (stationInputFrom.length >= 3 && selectedFrom === '' && selectedLocations.length !== 0) {
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

                    {showSelect && <select
                        className="custom-select custom-select-lg"
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