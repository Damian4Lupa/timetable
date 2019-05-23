import React, { Component } from 'react';

class SearchConnection extends Component {

    minDate = new Date().toISOString().slice(0, 10)
    date = new Date().toLocaleString().slice(0, 10)
    minTime = new Date().toLocaleTimeString().slice(0, 5)
    dateITime = `${this.date} ${this.minTime}`

    state = {
        date: this.minDate,
        time: this.minTime,
        dateITime: this.dateITime,

        dateComplete: true,
        timeComplete: false,
        dateITimeComplete: false,

    }

    // handleChangeCompliteStatus = (event) => {
    //     if (event.target.name === "date") {

    //         // this.setState({
    //         //     dateComplete: false
    //         // })
    //     }
    // }

    handleChangeDate = event => {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        })
    }

    downloadTimetable() {
        const API = `https://infopasazer.intercity.pl/?p=station&id=178662`

        fetch(API)
            .then(response => {

                if (response) {
                    console.log(response)
                    return response
                }
                throw Error(response.status)

            })
            .catch(error => alert(`\nEasy, it's just a error \n${error} \nRefresh the page `))
            .then(response => response.json())
            .then(data => {

                console.log(data)
            })

    }

    render() {

        const { date, time, dateITime, dateComplete, timeComplete, dateITimeComplete } = this.state

        let maxDate = this.minDate.slice(0, 4) * 1 + 1
        maxDate = maxDate + "-12-31"

        return (
            <div class="container">
                <div class="row marginTop">


                    <div class="col">
                        <input class="validFrom form-control form-control-lg" type="text" placeholder="FROM" />
                    </div>

                    <div class="col">
                        <input class="validTo form-control form-control-lg" type="text" placeholder="TO" />
                    </div>
                    <div class="col">

                        {dateComplete && <input name="date" class="validCalendar form-control form-control-lg" type="date" value={date} onChange={this.handleChangeDate} min={this.minDate} max={maxDate} onClick={this.handleChangeCompliteStatus} />}

                        {timeComplete && <input name="time" class="validClock form-control form-control-lg" type="time" value={time} onChange={this.handleChangeDate} onClick={this.handleChangeCompliteStatus} />}

                        {dateITimeComplete && <input name="dateITime" class="validTime form-control form-control-lg" type="text" value={dateITime} onChange={this.handleChangeDate} onClick={this.handleChangeCompliteStatus} />}

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