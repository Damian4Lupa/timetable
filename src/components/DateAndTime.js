import React, { Component } from 'react';

class DateAndTime extends Component {

    minDate = new Date().toISOString().slice(0, 10)
    minTime = new Date().toLocaleTimeString().slice(0, 5)

    state = {
        date: this.minDate,
        time: this.minTime,

        dateComplete: false,
        timeComplete: false,
        sendValue: true,
    }

    componentDidUpdate(previousProps, previousState) {

        let date = this.state.date
        let time = this.state.time

        if (previousState.date !== this.state.date || previousState.time !== this.state.time) {
            this.props.handleDateAndTime(date, time)
        }

        if (this.state.sendValue) {
            this.props.handleDateAndTime(date, time)

            this.setState({
                sendValue: false
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

    handleChangedateITime = () => {
        this.setState({
            dateComplete: true
        })
    }

    handleDateInput = () => {

        setTimeout(() => {
            this.setState({
                dateComplete: false,
                timeComplete: true
            })
        }, 1500)

    }

    handleTimeInput = () => {

        setTimeout(() => {
            this.setState({
                timeComplete: false
            })
        }, 1500)



    }

    dateAndTime = () => {
        const { date, time } = this.state

        let day = date.slice(8)
        let month = date.slice(5).slice(0, 2)
        let year = date.slice(0, 4)

        let result = `${day}.${month}.${year}  ${time}`
        return result
    }

    render() {

        const { date, time } = this.state

        let maxDate = this.minDate.slice(0, 4) * 1 + 1
        maxDate = maxDate + "-12-31"

        let sendData = this.props.chosen

        return (
            <>
                <input
                    name="dateITime"
                    className="validTime form-control form-control-lg" type="text"
                    value={this.dateAndTime()}
                    onChange={sendData}
                    onClick={this.handleChangedateITime}
                />

                {this.state.dateComplete && <input
                    name="date"
                    className="validCalendar form-control form-control-lg mt-3"
                    type="date"
                    value={date}
                    onChange={this.handleChangeData}
                    min={this.minDate}
                    max={maxDate}
                    onClick={this.handleChangeCompliteStatus}
                    onInput={this.handleDateInput}
                />}

                {this.state.timeComplete && <input
                    name="time"
                    className="validClock form-control form-control-lg mt-3"
                    type="time"
                    value={time}
                    onChange={this.handleChangeData}
                    onClick={this.handleChangeCompliteStatus}
                    onInput={this.handleTimeInput}
                />}
            </>
        );
    }
}

export default DateAndTime;