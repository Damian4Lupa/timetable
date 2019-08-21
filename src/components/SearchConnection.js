import React, { Component } from 'react';
import InputFrom from './InputFrom'
import InputTo from './InputTo'
import DateAndTime from './DateAndTime'
import FoundConnection from './FoundConnection'
// const data = require('./data')

class SearchConnection extends Component {

    state = {
        date: "",
        time: "",

        selectedFrom: '',
        selectedFromLonlat: '',

        selectedTo: '',
        selectedToLonlat: '',

        foundConnection: [],
        show_FoundConnection: false,
        errorConnetion: false,
        loadingData: false,
    }

    downloadTimetable = () => {

        // const { selectedFromLonlat, selectedToLonlat, time, date } = this.state

        // const API = `https://transportapi.com/v3/uk/public/journey/from/lonlat:${selectedFromLonlat}/to/lonlat:${selectedToLonlat}/at/${date}/${time}.json?app_id=66901113&app_key=65d3a215e85ef5745c85521230c46e42&modes=train-bus&service=southeast`

        const API = "https://transportapi.com/v3/uk/public/journey/from/lonlat:-0.134649,51.529258/to/lonlat:-0.088780,51.506383/at/2019-08-20/15:20.json?app_id=66901113&app_key=65d3a215e85ef5745c85521230c46e42&modes=train-bus&service=southeast"

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

                console.log(data)

                this.setState({
                    foundConnection: data,
                    show_FoundConnection: true,
                    loadingData: false
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

    handleSelectedFrom = selectedFrom => {
        this.setState({
            selectedFrom,
        })
    }

    handleSelectedFromLonlat = selectedFromLonlat => {
        this.setState({
            selectedFromLonlat,
        })
    }

    handleInputTo = selectedTo => {
        this.setState({
            selectedTo
        })
    }

    handleSelectedToLonlat = selectedToLonlat => {
        this.setState({
            selectedToLonlat
        })
    }

    handleDateAndTime = (date, time) => {
        // console.log(date, time)
        this.setState({
            date,
            time
        })
    }

    handleErrorConnetion = () => {
        this.setState({
            errorConnetion: true
        })

        setTimeout(() => {
            this.setState({
                errorConnetion: false
            })
        }, 2500);

    }

    handleButtonLoading = () => {
        this.setState({
            loadingData: true
        })
    }

    handleButtonSearch = () => {

        const { selectedFrom, selectedTo } = this.state

        if (selectedFrom !== '' && selectedTo !== '') {
            this.handleButtonLoading()
            this.downloadTimetable()
        } else {
            this.handleErrorConnetion()
        }
    }

    render() {

        const { show_FoundConnection, errorConnetion, loadingData } = this.state

        const show_error = <h4 className="text-center mt-4 text-muted">Please select the start and end stations correctly</h4>

        return (
            <div className="container">
                <div className="row marginTop">

                    <div className="col">

                        <InputFrom
                            handleSelectedFrom={this.handleSelectedFrom}
                            handleSelectedFromLonlat={this.handleSelectedFromLonlat}
                        />

                    </div>

                    <div className="col">

                        <InputTo
                            handleInputTo={this.handleInputTo}
                            handleSelectedToLonlat={this.handleSelectedToLonlat}
                        />

                    </div>

                    <div className="col">

                        <DateAndTime handleDateAndTime={this.handleDateAndTime} />

                    </div>
                    <div className="col">

                        {loadingData || <button
                            type="button"
                            className="btn btn-danger form-control form-control-lg"
                            onClick={this.handleButtonSearch}
                        >
                            FIND YOUR CONNECTION
                            </button>}

                        {loadingData && <button
                            type="button"
                            className="btn btn-danger form-control form-control-lg"
                        >
                            <span class="spinner-border spinner-border-sm mr-2 mb-1" role="status" aria-hidden="true"></span>
                            LOADING...
                        </button>}

                    </div>

                </div>
                <div>
                    {errorConnetion && show_error}
                </div>

                {show_FoundConnection && <FoundConnection
                    connection={this.state.foundConnection}
                // stationTo={this.state.stationInputTo}
                />}

            </div>
        );
    }
}

export default SearchConnection;