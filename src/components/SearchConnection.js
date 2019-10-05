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
        sortConnection: [],

        changeBackground: false,
        changeBackgroundEnd: false,
        fotoHeader: "",
        show_FoundConnection: false,
        errorConnetion: false,
        loadingData: false,
    }

    interval = 0

    componentDidMount = () => {
        this.changeFotoHaeder()

        this.interval = setInterval(() => {
            this.changeFotoHaeder()
        }, 15000);
    }

    componentDidUpdate = (prevProps, prevState) => {

        if (prevState.selectedFrom !== this.state.selectedFrom) {
            clearInterval(this.interval)
        }
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

                // let connection = data.routes

                let test = this.sortTable(data.routes)

                console.log("sort table in parent", test)

                this.setState({
                    foundConnection: data,
                    sortConnection: test,
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
            // this.handleShowFoundConnection()

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

        this.setState({
            fotoHeader: className
        })
    }

    changeDisplay = () => {

        if (this.state.show_FoundConnection) {

            if ($('#foto-header').hasClass('foto-header-bus1')) {
                $('#foto-header').attr('class', 'display-none')
                // $('#foto-header').removeClass('foto-header-bus1').addClass('display-none')
                // $('#foto-header').addClass('display-none')
            } else if ($('#foto-header').hasClass('foto-header-train1')) {
                $('#foto-header').attr('class', 'display-none')
                // $('#foto-header').removeClass('foto-header-train1').addClass('display-none')
                // $('#foto-header').addClass('display-none')
            } else if ($('#foto-header').hasClass('foto-header-train2')) {
                $('#foto-header').attr('class', 'display-none')
                // $('#foto-header').removeClass('foto-header-train2').addClass('display-none')
                // $('#foto-header').addClass('display-none')
            } else if ($('#foto-header').hasClass('foto-header-train3')) {
                $('#foto-header').attr('class', 'display-none')
                // $('#foto-header').removeClass('foto-header-train3').addClass('display-none')
                // $('#foto-header').addClass('display-none')
            } else if ($('#foto-header').hasClass('foto-header-train4')) {
                $('#foto-header').attr('class', 'display-none')
                // $('#foto-header').removeClass('foto-header-train4').addClass('display-none')
                // $('#foto-header').addClass('display-none')
            }
        }
    }

    sortTable = connection => {

        // let connection = this.state.foundConnection.routes

        function sortObject(obj) {
            var arr = [];
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    let number = parseInt(obj[prop].duration)
                    arr.push({
                        'key': prop,
                        'value': number,
                        'duration': obj[prop].duration,
                        'mode': obj[prop].mode,
                        'line_name': obj[prop].line_name,
                        'destination': obj[prop].destination,
                        'from_point_name': obj[prop].from_point_name,
                        'to_point_name': obj[prop].to_point_name,
                        'route_parts': obj[prop].route_parts,
                        'departure_time': obj[prop].departure_time,
                        'arrival_time': obj[prop].arrival_time,
                        'arrival_date': obj[prop].arrival_date,
                    });
                }
            }
            arr.sort(function (a, b) { return a.value - b.value; });

            return arr;
        }

        let arr = sortObject(connection);

        console.log("sort", arr)

        return arr
    }

    render() {

        const { show_FoundConnection, errorConnetion, loadingData, fotoHeader } = this.state

        const show_error = <h4 className="text-center mt-4 text-muted">Please select the start and end stations correctly</h4>

        return (
            <div id="foto-header" className={fotoHeader} display={this.changeDisplay()}>

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
                        sortConnection={this.state.sortConnection}
                    />}
                </div>
            </div>
        );
    }
}

export default SearchConnection;