import React, { Component } from 'react';
import $ from 'jquery'
import InputFrom from './InputFrom'
import InputTo from './InputTo'
import DateAndTime from './DateAndTime'
import FoundConnection from './FoundConnection'

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

        if (selectedFrom !== '' && selectedTo !== '') {
            this.handleButtonLoading()
            this.downloadTimetable()
        } else {
            this.handleErrorConnetion()
        }
    }

    changeFotoHaeder = () => {
        let className = ""

        const style = [
            { id: 1, value: "foto-header-bus1" },
            { id: 2, value: "foto-header-train1" },
            { id: 3, value: "foto-header-train2" },
            { id: 4, value: "foto-header-train3" },
            { id: 4, value: "foto-header-train4" }
        ]

        const index = Math.floor(Math.random() * 4 + 1)

        className = style[index].value

        return className
    }

    changeDisplay = () => {

        if (this.state.show_FoundConnection) {

            if ($('#foto-header').hasClass('foto-header-bus1')) {
                $('.foto-header-bus1').css("display", "none")
            } else if ($('#foto-header').hasClass('foto-header-train1')) {
                $('.foto-header-train1').css("display", "none")
            } else if ($('#foto-header').hasClass('foto-header-train2')) {
                $('.foto-header-train2').css("display", "none")
            } else if ($('#foto-header').hasClass('foto-header-train3')) {
                $('.foto-header-train3').css("display", "none")
            } else if ($('#foto-header').hasClass('foto-header-train4')) {
                $('.foto-header-train4').css("display", "none")
            }







            // $('#foto-header').css("display", "none")
            // console.log("działa display none")
        }

        // $('#foto-header').css("display", "block")
        // console.log("działa display block")


    }

    render() {

        const { show_FoundConnection, errorConnetion, loadingData } = this.state

        const show_error = <h4 className="text-center mt-4 text-muted">Please select the start and end stations correctly</h4>

        // console.log(this.state.foundConnection.routes)

        return (
            <div id="foto-header" className={this.changeFotoHaeder()} value={this.changeDisplay()}>

                <img className="foto-background" alt="foto-background" />

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
                                Find your connection
                        </button>}

                            {loadingData && <button
                                type="button"
                                className="btn btn-danger form-control form-control-lg"
                            >
                                <span className="spinner-border spinner-border-sm mr-2 mb-1" role="status" aria-hidden="true"></span>
                                Loading...
                        </button>}
                        </div>
                    </div>
                    <div>
                        {errorConnetion && show_error}
                    </div>

                    {show_FoundConnection && <FoundConnection
                        connection={this.state.foundConnection}
                    />}
                </div>
            </div>
        );
    }
}

export default SearchConnection;