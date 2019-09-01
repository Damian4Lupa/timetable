import React, { Component } from 'react';
import $ from "jquery"

class FoundConnection extends Component {

    state = {
        connection: [],
        duration: "",
        totalCost: 10,
        table: [],
        tableFilling: [],

        showButton: false
    }

    componentDidMount() {
        this.shortenTables22()
        // this.totalCost(this.props.connection.routes[0].route_parts)

        this.setState({
            connection: this.props.connection.routes[0].route_parts,
            duration: this.props.connection.routes[0].duration
        })

        setTimeout(() => {
            this.tableFilling()
            this.totalCost(this.state.tableFilling)
        }, 10);

    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.connection !== this.state.connection) {
            this.setState({
                connection: this.props.connection.routes[0].route_parts,
                duration: this.props.connection.routes[0].duration
            })

            setTimeout(() => {
                this.tableFilling()
                this.totalCost(this.state.tableFilling)
            }, 10);

        }
        
    }

    showPrice = (mode, duration) => {
        let price = ""
        let number = parseInt(duration)

        if (mode === "foot") {
            return "-"
        }

        if (mode === "bus" || mode === "dlr") {
            price = 2
        } else if (mode === "train" && number >= 6 && number < 8) {
            price = 30
        } else if (mode === "train" && number >= 3 && number < 6) {
            price = 20
        } else if (mode === "train" && number >= 1 && number < 3) {
            price = 10
        } else if (mode === "train" && number >= 0 && number < 1) {
            price = 5
        }
        return price + "£"
    }

    shortenTables = () => {
        let connection = this.props.connection.routes[0].route_parts
        let connectionLength = (connection.length - 1)

        let array = [
            [1, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [2, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [3, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [4, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [5, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [6, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [7, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [8, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [9, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [10, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [11, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [12, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [13, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [14, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [15, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ]

        let result = array.slice(0, connectionLength)

        return result
    }

    shortenTables22 = () => {
        let connection = this.props.connection.routes[0].route_parts
        let connectionLength = (connection.length - 1)

        let array = [
            [1, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [2, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [3, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [4, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [5, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [6, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [7, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [8, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [9, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [10, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [11, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [12, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [13, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [14, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            [15, "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ]

        let result = array.slice(0, connectionLength)

        this.setState({
            table: result
        })
    }

    tableFilling = () => {
        const { showButton, connection } = this.state

        // let connection = this.state.connection
        // let duration = this.state.duration
        let test = this.state.table
        let table = [...test]
        console.log("tableFilling", table)
        let NewConnection = [...connection]

        for (let i = 0; i < table.length; i++) {

            let content = showButton ? <button type="button" className="btn btn-danger form-control ticked">buy a ticket</button> : <span className="ticked"><small>buy a ticket</small><br />{this.showPrice(NewConnection[i].mode, NewConnection[i].duration)}</span>

            let duration = NewConnection[i].mode === "train" ? content : this.showPrice(NewConnection[i].mode, NewConnection[i].duration)

            table[i][1] = NewConnection[i].from_point_name
            table[i][2] = NewConnection[i].to_point_name
            table[i][3] = NewConnection[i].mode === "bus" ? `${NewConnection[i].mode} (line: ${NewConnection[i].line_name})` : NewConnection[i].mode
            table[i][4] = this.travelTime(NewConnection[i].duration)
            table[i][5] = duration
            // table[i][5] = this.showPrice(NewConnection[i].mode, NewConnection[i].duration)
            table[i][6] = `departure: ${NewConnection[i].departure_time}`
            table[i][7] = `arrival: ${NewConnection[i].arrival_time}`
            table[i][8] = NewConnection[i].destination ? `destination: ${NewConnection[i].destination}` : null
            table[i][9] = this.showPrice(NewConnection[i].mode, NewConnection[i].duration)
        }

        this.setState({
            tableFilling: table
        })

    }

    totalCost = (table) => {

        // let table = this.state.connection
        let cost = 0

        for (let i = 0; i < table.length; i++) {

            let array = table[i][9]
            let number = 0

            if (array.length === 2) {
                let ccc = array.substring(0, 1)
                let bbb = +ccc
                number = bbb
            } else if (array.length === 3) {
                let ccc = array.substring(0, 2)
                let bbb = +ccc
                number = bbb
            }
            cost += number
        }

        this.setState({
            totalCost: cost
        })
    }

    travelSummary = (duration) => {

        let hours = duration.substring(0, 2)
        let hoursNumber = +hours
        let minutes = duration.substring(3, 5)
        let minutesNumber = +minutes
        let cost = this.state.totalCost

        // let cost = 0

        // for (let i = 0; i < table.length; i++) {

        //     let array = table[i][5]
        //     let number = 0

        //     if (array.length === 2) {
        //         let ccc = array.substring(0, 1)
        //         let bbb = +ccc
        //         number = bbb
        //     } else if (array.length === 3) {
        //         let ccc = array.substring(0, 2)
        //         let bbb = +ccc
        //         number = bbb
        //     }
        //     cost += number
        // }

        const result = <h6 className="ml-5 mt-4">Total travel time: {`${hoursNumber}h ${minutesNumber}m`}, total cost: {cost}£.</h6>

        return result
    }

    travelTime = (duration) => {
        let hours = duration.substring(0, 2)
        let hoursNumber = +hours
        let minutes = duration.substring(3, 5)
        let minutesNumber = +minutes
        let result = ""

        if (hoursNumber === 0) {
            result = `${minutesNumber}m`
        } else {
            result = `${hoursNumber}h ${minutesNumber}m`
        }

        return result
    }

    // showButton = () => {

    //     $('.ticked').mouseenter(() => {
    //         // console.log("dodaj button")
    //         $('.active').toggleClass("hide")
    //         $('.hide').toggleClass("active")
    //     })
    //     // $('.ticked').mouseleave(() => {
    //     //     $('.active').toggleClass("hide")
    //     //     $('.hide').toggleClass("active")
    //     // }
    // }

    showButton = () => {

        // $('.ticked').mouseenter(() => {
        //     $('.ticked').toggleClass('hide')
        // })

        $('.ticked').mouseenter(() => {
            this.setState({
                showButton: true
            })
        })

        $('.ticked').mouseleave(() => {
            this.setState({
                showButton: false
            })
        })
    }

    render() {

        const { showButton } = this.state

        let connection = this.props.connection.routes[0].route_parts
        let duration = this.props.connection.routes[0].duration
        let table = this.shortenTables()
        let NewConnection = [...connection]

        for (let i = 0; i < table.length; i++) {

            // let content = <>
            //     <button type="button" className="btn btn-danger form-control ticked hide">buy a ticket</button><span className="ticked"><small>buy a ticket</small><br />{this.showPrice(NewConnection[i].mode, NewConnection[i].duration)}</span>
            // </>

            let content = showButton ? <button type="button" className="btn btn-danger form-control ticked">buy a ticket</button> : <span className="ticked"><small>buy a ticket</small><br />{this.showPrice(NewConnection[i].mode, NewConnection[i].duration)}</span>

            let duration = NewConnection[i].mode === "train" ? content : this.showPrice(NewConnection[i].mode, NewConnection[i].duration)

            table[i][1] = NewConnection[i].from_point_name
            table[i][2] = NewConnection[i].to_point_name
            table[i][3] = NewConnection[i].mode === "bus" ? `${NewConnection[i].mode} (line: ${NewConnection[i].line_name})` : NewConnection[i].mode
            table[i][4] = this.travelTime(NewConnection[i].duration)
            table[i][5] = duration
            // table[i][5] = this.showPrice(NewConnection[i].mode, NewConnection[i].duration)
            table[i][6] = `departure: ${NewConnection[i].departure_time}`
            table[i][7] = `arrival: ${NewConnection[i].arrival_time}`
            table[i][8] = NewConnection[i].destination ? `destination: ${NewConnection[i].destination}` : null
            table[i][9] = this.showPrice(NewConnection[i].mode, NewConnection[i].duration)
        }

        const row = table.map((table) =>
            <>
                <tbody>
                    <tr
                        class="clickable"
                        data-toggle="collapse"
                        data-target={`#group-of-rows-${table[0]}`}
                        aria-expanded="false"
                        aria-controls={`group-of-rows-${table[0]}`}
                    >
                        <td>{table[0]}</td>
                        <td>{table[1]}</td>
                        <td>{table[2]}</td>
                        <td>{table[3]}</td>
                        <td>{table[4]}</td>
                        <td>{table[5]}</td>
                    </tr>
                </tbody>

                <tbody
                    id={`group-of-rows-${table[0]}`}
                    class="collapse text-muted"
                >
                    <tr>
                        <td></td>
                        <td>{table[6]}</td>
                        <td>{table[7]}</td>
                        <td>{table[8]}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </>
        )

        // this.totalCost(table)

        this.showButton()

        return (
            <>
                <table class="table table-hover text-center mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col-3">From</th>
                            <th scope="col-3">To</th>
                            <th scope="col-3">Connection</th>
                            <th scope="col-1">Travel time</th>
                            <th scope="col-1">Normal price</th>
                        </tr>
                    </thead>

                    {row}

                </table>

                {this.travelSummary(duration)}

            </>
        );
    }
}

export default FoundConnection;