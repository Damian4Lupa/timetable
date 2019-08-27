import React, { Component } from 'react';

class FoundConnection extends Component {
    state = {}

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
            [1, "-", "-", "-", "-", "-", "-", "-", "-"],
            [2, "-", "-", "-", "-", "-", "-", "-", "-"],
            [3, "-", "-", "-", "-", "-", "-", "-", "-"],
            [4, "-", "-", "-", "-", "-", "-", "-", "-"],
            [5, "-", "-", "-", "-", "-", "-", "-", "-"],
            [6, "-", "-", "-", "-", "-", "-", "-", "-"],
            [7, "-", "-", "-", "-", "-", "-", "-", "-"],
            [8, "-", "-", "-", "-", "-", "-", "-", "-"],
            [9, "-", "-", "-", "-", "-", "-", "-", "-"],
            [10, "-", "-", "-", "-", "-", "-", "-", "-"],
            [11, "-", "-", "-", "-", "-", "-", "-", "-"],
            [12, "-", "-", "-", "-", "-", "-", "-", "-"],
            [13, "-", "-", "-", "-", "-", "-", "-", "-"],
            [14, "-", "-", "-", "-", "-", "-", "-", "-"],
            [15, "-", "-", "-", "-", "-", "-", "-", "-"],
        ]

        let table = array.slice(0, connectionLength)

        return table
    }

    shortenTablesDetails = () => {
        let connection = this.props.connection.routes[0].route_parts
        let connectionLength = (connection.length - 1)

        let array = [
            [1, "-", "-", "-"],
            [2, "-", "-", "-"],
            [3, "-", "-", "-"],
            [4, "-", "-", "-"],
            [5, "-", "-", "-"],
            [6, "-", "-", "-"],
            [7, "-", "-", "-"],
            [8, "-", "-", "-"],
            [9, "-", "-", "-"],
            [10, "-", "-", "-"],
            [11, "-", "-", "-"],
            [12, "-", "-", "-"],
            [13, "-", "-", "-"],
            [14, "-", "-", "-"],
            [15, "-", "-", "-"],
        ]

        let table = array.slice(0, connectionLength)

        return table
    }




    render() {

        let connection = this.props.connection.routes[0].route_parts
        let duration = this.props.connection.routes[0].duration
        let table = this.shortenTables()
        // let details = this.shortenTablesDetails()
        let NewConnection = [...connection]
        // let detailsConnection = [...connection]

        for (let i = 0; i < table.length; i++) {

            if (NewConnection[i].from_point_name.includes("specified point")) {
                console.log("specified point")
                // return delete NewConnection[i]
                // console.log(NewConnection)
            }

            table[i][1] = NewConnection[i].from_point_name
            table[i][2] = NewConnection[i].to_point_name
            table[i][3] = NewConnection[i].mode === "bus" ? `${NewConnection[i].mode} (line: ${NewConnection[i].line_name})` : NewConnection[i].mode
            table[i][4] = NewConnection[i].duration
            table[i][5] = this.showPrice(NewConnection[i].mode, NewConnection[i].duration)
            table[i][6] = NewConnection[i].destination ? `destination: ${NewConnection[i].destination}` : null
            table[i][7] = `arrival: ${NewConnection[i].arrival_time}`
            table[i][8] = `departure: ${NewConnection[i].departure_time}`
        }

        // for (let i = 0; i < details.length; i++) {

        //     details[i][0] = ""
        //     details[i][1] = detailsConnection[i].destination ? `destination: ${detailsConnection[i].destination}` : ""
        //     details[i][2] = `arrival time: ${detailsConnection[i].arrival_time}`
        //     details[i][3] = `departure time: ${detailsConnection[i].departure_time}`
        // }

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
                    </tr>
                </tbody>
            </>
        )

        // const row2 = details.map((details) =>

        //     <tbody id={`group-of-rows-${table[0]}`} class="collapse">
        //         <tr>
        //             <td>{details[0]}</td>
        //             <td>{details[1]}</td>
        //             <td>{details[2]}</td>
        //             <td>{details[3]}</td>
        //         </tr>
        //     </tbody>
        // )

        const summary = <h6>Total travel time: {duration}, total cost: {null}</h6>

        return (
            <>

                <table class="table table-hover text-center mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Connection</th>
                            <th scope="col">Travel time</th>
                            <th scope="col">Normal price</th>
                        </tr>
                    </thead>

                    {row}

                </table>




                {/* <table className="table table-hover text-center mt-5">

                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Connection</th>
                            <th scope="col">Travel time</th>
                            <th scope="col">Normal price</th>
                        </tr>
                    </thead>
                    <tbody>

                        {row}

                    </tbody>

                </table> */}

                {summary}
            </>
        );
    }
}

export default FoundConnection;