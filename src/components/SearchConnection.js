import React, { Component } from 'react';
import InputFrom from './InputFrom'
import InputTo from './InputTo'
import DateAndTime from './DateAndTime'
import FoundConnection from './FoundConnection'
const data = require('./data')

class SearchConnection extends Component {

    state = {
        date: "",
        time: "",

        stationInputFrom: '', //wartość wpisana w input - wyświetlana wartoś
        stationInputTo: '',
        // selectedLocations: [],
        // selectedLocationsSize: 0, //rozmiar okna selected

        selectedFromCrs: '',
        selectedToCrs: '',

        foundConnection: [],
        show_FoundConnection: true
    }

    downloadTimetable = () => {

        const { selectedFromCrs, time, date } = this.state

        const API = `https://transportapi.com/v3/uk/train/station/${selectedFromCrs}/${date}/${time}/timetable.json?app_id=66901113&app_key=65d3a215e85ef5745c85521230c46e42&train_status=passenger`

        fetch(API)
            .then(response => {

                if (response.ok) {
                    return response
                }
                throw Error(response.status)

            })
            .catch(error => alert(`\nEasy, it's just a error \n${error} \nRefresh the page `))
            .then(response => response.json())
            .then(data => {

                // console.log(data)

                this.setState({
                    foundConnection: data
                })
            })
    }

    // componentDidUpdate(previousProps, previousState) {
    //     let inputValue = this.state.stationInputFrom //to co wpisuje w input
    //     let station = [...data.data] //punkt wejściowy

    //     let selectedLocations = [] //dopasowane lokalizacje po wyszukaniu - do przesłania do state - obiekt z id, locat. i crs po wyszukiwaniu

    //     let selectedLocationsSize = 0

    //     if (previousState.stationInputFrom !== this.state.stationInputFrom) {
    //         selectedLocations = station.filter(item => item.location.includes(inputValue))

    //         if (selectedLocations.length > 5) {
    //             selectedLocationsSize = 5
    //         } else if (selectedLocations.length === 1) {
    //             selectedLocationsSize = 2
    //         } else {
    //             selectedLocationsSize = selectedLocations.length
    //         }

    //         this.setState({
    //             selectedLocations,
    //             selectedLocationsSize
    //         })
    //     }
    // }

    handleInputFrom = (selectedFromCrs, stationInputFrom) => {
        // console.log(selectedFromCrs, stationInputFrom)

        this.setState({
            selectedFromCrs,
            stationInputFrom
        })
    }

    handleInputTo = (stationInputTo, selectedToCrs) => {
        this.setState({
            stationInputTo,
            selectedToCrs
        })
    }

    handleDateAndTime = (date, time) => {
        console.log(date, time)
        this.setState({
            date,
            time
        })
    }

    handleButtonSearch = () => {
        this.downloadTimetable()
    }

    render() {

        const { show_FoundConnection } = this.state

        return (
            <div className="container">
                <div className="row marginTop">

                    <div className="col">

                        <InputFrom handleInputFrom={this.handleInputFrom} />

                    </div>

                    <div className="col">

                        <InputTo handleInputTo={this.handleInputTo} />

                    </div>

                    <div className="col">

                        <DateAndTime handleDateAndTime={this.handleDateAndTime} />

                    </div>
                    <div className="col">

                        <button
                            type="button"
                            className="btn btn-danger form-control form-control-lg"
                            onClick={this.handleButtonSearch}
                        >
                            FIND YOUR CONNECTION
                            </button>

                    </div>
                </div>

                {/* <div className="row mt-5"> */}
              
                    {show_FoundConnection && <FoundConnection
                        connection={this.state.foundConnection}
                        stationTo={this.state.stationInputTo}
                    />}


                {/* </div> */}

            </div>
        );
    }
}

export default SearchConnection;