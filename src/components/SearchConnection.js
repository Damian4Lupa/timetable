import React, { Component } from 'react';
import InputFrom from './InputFrom'
import InputTo from './InputTo'
import DateAndTime from './DateAndTime'
const data = require('./data')

class SearchConnection extends Component {

    minDate = new Date().toISOString().slice(0, 10)
    date = new Date().toLocaleString().slice(0, 10)
    minTime = new Date().toLocaleTimeString().slice(0, 5)
    dateITime = `${this.date} ${this.minTime}`

    state = {
        date: this.minDate,
        time: this.minTime,
        dateITime: this.dateITime,

        stationInputFrom: '', //wartość wpisana w input - wyświetlana wartoś
        stationInputTo: '',
        selectedLocations: [],
        selectedLocationsSize: 0, //rozmiar okna selected

        // selectedFrom: '',
        // selectedTo: '',
        selectedFromCrs: '',
        selectedToCrs: '',

        flags: {
            showSelect: true,
            formIsChanged: true,
            dateComplete: false,
            timeComplete: false,
            dateITimeComplete: true,
        }
    }


    handleChangeData = event => {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        })
    }

    downloadTimetable = () => {

        const { selectedFromCrs, time, } = this.state
        //szablon1 https://developer.transportapi.com/docs?raml=https://transportapi.com/v3/raml/transportapi.raml##request_uk_public_journey_from_from_to_to_type_date_time_json

        //szablon2 https://transportapi.com/v3/uk/train/station/STP/2019-05-15/12:20/timetable.json?app_id=66901113&app_key=65d3a215e85ef5745c85521230c46e42&train_status=passenger 


        const API = `https://transportapi.com/v3/uk/train/station/${selectedFromCrs}/${this.minDate}/${time}/timetable.json?app_id=66901113&app_key=65d3a215e85ef5745c85521230c46e42&train_status=passenger`

        // api pobiera liste dla danego przystanku, potem szukanie po destination

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
                const currency = data.rates
                const date = data.date


                this.setState({
                    currency,
                    date
                })
            })
            .then(() => {
                let rate = this.state.currency[this.state.currencyIWant]
                this.setState({
                    rate
                })
            })
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

    // handleSearchForm2 = event => {
    //     // console.log(event.target.value)

    //     this.setState({
    //         selectedFromCrs: event.target.value
    //     })
    // }

    // handleSearchForm(id) {
    //     if (this.state.flags.formIsChanged) {
    //         this.setState({
    //             selectedFromCrs: id,
    //             flags: {
    //                 formIsChanged: false
    //             }
    //         })
    //     }
    // }






    render() {

        const { date, time, dateITime, stationInputFrom, stationInputTo, selectedLocationsSize, selectedLocations, selectedFromCrs } = this.state

        let maxDate = this.minDate.slice(0, 4) * 1 + 1
        maxDate = maxDate + "-12-31"



        return (
            <div className="container">
                <div className="row marginTop">

                    <div className="col">

                        <InputFrom />

                    </div>

                    <div className="col">

                        <InputTo />

                    </div>

                    <div className="col">

                        <DateAndTime />

                    </div>
                    <div className="col">

                        <button type="button" className="btn btn-danger form-control form-control-lg">FIND YOUR CONNECTION</button>

                    </div>
                </div>
            </div>
        );
    }
}

export default SearchConnection;