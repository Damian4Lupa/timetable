import React, { Component } from 'react';
import SearchFrom from './SearchFrom'

class SearchConnection extends Component {

    minDate = new Date().toISOString().slice(0, 10)
    date = new Date().toLocaleString().slice(0, 10)
    minTime = new Date().toLocaleTimeString().slice(0, 5)
    dateITime = `${this.date} ${this.minTime}`

    state = {
        date: this.minDate,
        time: this.minTime,
        dateITime: this.dateITime,

        stationFrom: '',
        stationTo: '',

        dateComplete: true,
        timeComplete: false,
        dateITimeComplete: false,
    }

    data = [
        { location: "Abbey Road", CRS: "ZAL" },
        { location: "Abbey Wood", CRS: "ABW" },
        { location: "Abercwmboi", CRS: "ABI" },
        { location: "Abercynon", CRS: "ACY" },
        { location: "Aberdour", CRS: "AUR" },
        { location: "", CRS: "" },
        { location: "", CRS: "" },
        { location: "", CRS: "" },
        { location: "", CRS: "" },
        { location: "", CRS: "" },
        { location: "", CRS: "" },
        { location: "", CRS: "" },
        { location: "", CRS: "" },
        { location: "", CRS: "" },
        { location: "", CRS: "" },
        { location: "", CRS: "" },
        { location: "", CRS: "" },

    ]
    // handleChangeCompliteStatus = (event) => {
    //     if (event.target.name === "date") {

    //         // this.setState({
    //         //     dateComplete: false
    //         // })
    //     }
    // }

    handleChangeData = event => {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        })
    }

    downloadTimetable = () => {

        const { date, time, } = this.state
        //szablon1 https://developer.transportapi.com/docs?raml=https://transportapi.com/v3/raml/transportapi.raml##request_uk_public_journey_from_from_to_to_type_date_time_json

        //szablon2 https://transportapi.com/v3/uk/train/station/STP/2019-05-15/12:20/timetable.json?app_id=66901113&app_key=65d3a215e85ef5745c85521230c46e42&train_status=passenger 


        const API = `https://transportapi.com/v3/uk/train/station/STP/${this.minDate}/${time}/timetable.json?app_id=66901113&app_key=65d3a215e85ef5745c85521230c46e42&train_status=passenger`

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



    render() {

        const { date, time, dateITime, dateComplete, timeComplete, dateITimeComplete, stationFrom, stationTo } = this.state

        let maxDate = this.minDate.slice(0, 4) * 1 + 1
        maxDate = maxDate + "-12-31"

        let handleSearchFrom = this.state.stationFrom.length > 4 ? <SearchFrom search={stationFrom} /> : null

        // console.log(this.minDate, this.date)

        return (
            <div class="container">
                <div class="row marginTop">


                    <div class="col">
                        <input name="stationFrom" class="validFrom form-control form-control-lg" type="text" placeholder="FROM" value={stationFrom} onChange={this.handleChangeData} onClick={handleSearchFrom} />
                        <select name="selectFrom">
                            {handleSearchFrom}
                        </select>
                    </div>

                    <div class="col">
                        <input name="stationTo" class="validTo form-control form-control-lg" type="text" placeholder="TO" value={stationTo} onChange={this.handleChangeData} />
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