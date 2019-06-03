import React, { Component } from 'react';
import SearchFrom from './SearchFrom'
import SearchTo from './SearchTo'
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

    messages = {
        input_error: 'There is no such station'
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


//dodac tutaj warunki dla SearchTo

    }

    handleSearchForm2 = event => {
        // console.log(event.target.value)

        this.setState({
            selectedFromCrs: event.target.value
        })
    }

    handleSearchForm(id) {
        if (this.state.flags.formIsChanged) {
            this.setState({
                selectedFromCrs: id,
                flags: {
                    formIsChanged: false
                }

            })
        }
    }

    resetInputFrom = () => {

        this.setState({
            selectedLocations: [],
            selectedLocationsSize: 0,
            selectedFromCrs: '',
        })
    }

    //zmiana po kliknięciu i wyborze stacji docelowej z podpowiedzi
    handleSelectedLocationForm = event => {
        // console.log(event.target.getAttribute('name'))
        console.log(event.target.title)

        this.setState({
            stationInputFrom: event.target.title,
            selectedFromCrs: event.target.id,
            // flags: {
            //     showSelect: false
            // }
        })


    }

    //zestaw zasad i aktualizacji flag
    renderStatusOfFlags() {
        console.log("działa")

        // if (this.state.stationInputFrom.length >= 3) {
        //     this.setState({
        //         flags: {
        //             showSelect: true
        //         }
        //     })
        // }

    }



    render() {

        const { date, time, dateITime, stationInputFrom, stationInputTo, selectedLocationsSize, selectedLocations, selectedFromCrs } = this.state

        let maxDate = this.minDate.slice(0, 4) * 1 + 1
        maxDate = maxDate + "-12-31"

        let searchForm = selectedLocations.map(item => (
            <SearchFrom
                key={item.id}
                id={item.id}
                location={item.location}
                crs={item.CRS}
            // chosen={this.handleSearchForm(this, item.id)}
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

        // let show_errorFormMessage = <p>{this.messages.input_error}</p>

        // let errorFormMessage = selectedLocations.length === 0 ? show_errorFormMessage : null

        return (
            <div className="container">
                <div className="row marginTop">

                    <div className="col">
                        <input name="stationInputFrom" className="validFrom form-control form-control-lg" type="text" placeholder="FROM" value={stationInputFrom} onChange={this.handleChangeData} />


                        <div className="form-group mt-3">

                            {showSelect && <select className="custom-select custom-select-lg" size={selectedLocationsSize}
                                // onChange={this.handleSelectedLocationForm}
                                // onChange={this.handleSearchForm2}
                                onClick={this.handleSelectedLocationForm}
                            >
                                {searchForm}

                            </select>}
                            <center>{errorMessage}</center>
                            
                        </div>
                    </div>

                    <div className="col">
                        <input name="stationInputTo" className="validTo form-control form-control-lg" type="text" placeholder="TO" value={stationInputTo} onChange={this.handleChangeData} />
                    </div>
                    <div className="col">

                        {this.state.flags.dateITimeComplete && <input name="dateITime" className="validTime form-control form-control-lg" type="text" value={dateITime} onChange={this.handleChangeData} onClick={this.handleChangedateITime} />}

                        {this.state.flags.dateComplete && <input name="date" className="validCalendar form-control form-control-lg" type="date" value={date} onChange={this.handleChangeData} min={this.minDate} max={maxDate} onClick={this.handleChangeCompliteStatus} />}

                        {this.state.flags.timeComplete && <input name="time" className="validClock form-control form-control-lg" type="time" value={time} onChange={this.handleChangeData} onClick={this.handleChangeCompliteStatus} />}

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