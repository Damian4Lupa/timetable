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

        const { selectedFromLonlat, selectedToLonlat, time, date } = this.state

        const API = `https://transportapi.com/v3/uk/public/journey/from/lonlat:${selectedFromLonlat}/to/lonlat:${selectedToLonlat}/at/${date}/${time}.json?app_id=66901113&app_key=65d3a215e85ef5745c85521230c46e42&modes=train-bus&service=southeast`

        // const API = "https://transportapi.com/v3/uk/public/journey/from/lonlat:-0.134649,51.529258/to/lonlat:-0.088780,51.506383/at/2019-08-26/15:20.json?app_id=66901113&app_key=65d3a215e85ef5745c85521230c46e42&modes=train-bus&service=southeast"

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

        // this.downloadTimetable()

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
                            <span className="spinner-border spinner-border-sm mr-2 mb-1" role="status" aria-hidden="true"></span>
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

                <div>






                    <table class="table table-responsive table-hover">

                        <thead>
                            <tr><th>Column</th><th>Column</th><th>Column</th><th>Column</th></tr>
                        </thead>

                        <tbody>
                            <tr class="clickable" data-toggle="collapse" data-target="#group-of-rows-1" aria-expanded="false" aria-controls="group-of-rows-1">
                                <td><i class="fa fa-plus" aria-hidden="true"></i></td>
                                <td>aaaaaaaaaaaa</td>
                                <td>data</td>
                                <td>aaaaaaaaaaaaaa</td>
                            </tr>
                        </tbody>

                        <tbody id="group-of-rows-1" class="collapse">
                            <tr>
                                <td>- child row</td>
                                <td>data 1</td>
                                <td>aaaaaaaaaaaaaa 1</td>
                                <td>data 1</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr class="clickable" data-toggle="collapse" data-target="#group-of-rows-2" aria-expanded="false" aria-controls="group-of-rows-2">
                                <td><i class="fa fa-plus" aria-hidden="true"></i></td>
                                <td>data</td>
                                <td>data</td>
                                <td>data</td>
                            </tr>
                        </tbody>

                        <tbody id="group-of-rows-2" class="collapse">
                            <tr>
                                <td>- child row</td>
                                <td>data 2</td>
                                <td>data 2</td>
                                <td>data 2</td>
                            </tr>
                        </tbody>
                        
                    </table>








                </div>

            </div>
        );
    }
}

export default SearchConnection;