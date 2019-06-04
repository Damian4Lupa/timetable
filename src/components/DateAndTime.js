import React, { Component } from 'react';

class DateAndTime extends Component {

    minDate = new Date().toISOString().slice(0, 10)
    date = new Date().toLocaleString().slice(0, 10)
    minTime = new Date().toLocaleTimeString().slice(0, 5)
    dateITime = `${this.date} ${this.minTime}`

    state = {
        date: this.minDate,
        time: this.minTime,
        dateITime: this.dateITime,

        dateComplete: false,
        timeComplete: false,
        dateITimeComplete: true,
    }



    render() {

        const { date, time, dateITime } = this.state

        let maxDate = this.minDate.slice(0, 4) * 1 + 1
        maxDate = maxDate + "-12-31"

        return (
            <>
                {this.state.flags.dateITimeComplete && <input name="dateITime" className="validTime form-control form-control-lg" type="text" value={dateITime} onChange={this.handleChangeData} onClick={this.handleChangedateITime} />}

                {this.state.flags.dateComplete && <input name="date" className="validCalendar form-control form-control-lg" type="date" value={date} onChange={this.handleChangeData} min={this.minDate} max={maxDate} onClick={this.handleChangeCompliteStatus} />}

                {this.state.flags.timeComplete && <input name="time" className="validClock form-control form-control-lg" type="time" value={time} onChange={this.handleChangeData} onClick={this.handleChangeCompliteStatus} />}
            </>
        );
    }
}

export default DateAndTime;