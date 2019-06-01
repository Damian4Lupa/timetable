import React, { Component } from 'react';
import SearchFrom from './SearchFrom'
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

        stationInputFrom: '',
        stationInputTo: '',
        selectedLocations: [],
        selectedLocationsSize: 0,

        selectedFrom: '',
        selectedTo: '',
        selectedFromCrs: 'STP',
        selectedToCrs: '',

        flags: {
            showSelect: true,
            formIsChanged: true,
            dateComplete: true,
            timeComplete: false,
            dateITimeComplete: false,
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

            if (selectedLocationsSize > 5) {
                selectedLocationsSize = 5
            } else if (selectedLocationsSize = 2) {
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

    handleSearchForm2 = event => {
        // console.log(event.target.value)

        this.setState({
            selectedFromCrs: event.target.value
        })
    }

    handleSearchForm(id) {
        if (this.state.formIsChanged) {
            this.setState({
                selectedFromCrs: id,
                formIsChanged: false
            })
        }
    }

    handleSelectedLocationForm2 = event => {
        console.log(event.target.getAttribute('name'))
    }

    renderStatusOfFlags = () => {
        // console.log("działa")

        //zestaw zasad i aktualizacji flag
    }



    render() {

        const { date, time, dateITime, dateComplete, timeComplete, dateITimeComplete, stationInputFrom, stationInputTo, selectedLocationsSize, selectedLocations } = this.state

        let maxDate = this.minDate.slice(0, 4) * 1 + 1
        maxDate = maxDate + "-12-31"

        let searchForm = selectedLocations.map(item => (
            <SearchFrom
                key={item.id}
                id={item.id}
                location={item.location}
                crs={item.CRS}
                // name={item.location}
                chosen={this.handleSearchForm(this, item.id)}
            />
        ))

        // let show_SearchFrom = this.state.stationInputFrom.length >= 3 ? searchForm : null

        this.renderStatusOfFlags()

        // show_SelectIHave = this.data.map(item => (
        //     <SelectIHave key={item.id} id={item.id} title={item.title} chosen={this.handleSelectIHave(this, item.id)} />))



        return (
            <div class="container">
                <div class="row marginTop">


                    <div class="col">
                        <input name="stationInputFrom" class="validFrom form-control form-control-lg" type="text" placeholder="FROM" value={stationInputFrom} onChange={this.handleChangeData} />


                        <div class="form-group mt-3">

                            {this.state.flags.showSelect && <select class="custom-select custom-select-lg" size={selectedLocationsSize}
                                onChange={this.handleSearchForm2}
                                onClick={this.handleSelectedLocationForm2}
                            >

                                {searchForm}

                            </select>}


                        </div>

                    </div>


                    {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

                    <div class="col">
                        <input name="stationInputTo" class="validTo form-control form-control-lg" type="text" placeholder="TO" value={stationInputTo} onChange={this.handleChangeData} />
                    </div>
                    <div class="col">

                        {dateComplete && <input name="date" class="validCalendar form-control form-control-lg" type="date" value={date} onChange={this.handleChangeData} min={this.minDate} max={maxDate} onClick={this.handleChangeCompliteStatus} />}

                        {timeComplete && <input name="time" class="validClock form-control form-control-lg" type="time" value={time} onChange={this.handleChangeData} onClick={this.handleChangeCompliteStatus} />}

                        {dateITimeComplete && <input name="dateITime" class="validTime form-control form-control-lg" type="text" value={dateITime} onChange={this.handleChangeData} onClick={this.handleChangeCompliteStatus} />}

                    </div>
                    <div class="col">

                        <button type="button" class="btn btn-danger form-control form-control-lg">FIND YOUR CONNECTION</button>

                    </div>
                </div>
            </div>
        );
    }
}

export default SearchConnection;