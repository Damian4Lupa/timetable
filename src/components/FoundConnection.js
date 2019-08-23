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

    render() {

        let connection = this.props.connection.routes[0].route_parts
        let duration = this.props.connection.routes[0].duration
        let connectionLength = (connection.length - 1)

        let array = [
            [1, "-", "-", "-", "-", "-"],
            [2, "-", "-", "-", "-", "-"],
            [3, "-", "-", "-", "-", "-"],
            [4, "-", "-", "-", "-", "-"],
            [5, "-", "-", "-", "-", "-"],
            [6, "-", "-", "-", "-", "-"],
            [7, "-", "-", "-", "-", "-"],
            [8, "-", "-", "-", "-", "-"],
            [9, "-", "-", "-", "-", "-"],
            [10, "-", "-", "-", "-", "-"],
            [11, "-", "-", "-", "-", "-"],
            [12, "-", "-", "-", "-", "-"],
            [13, "-", "-", "-", "-", "-"],
            [14, "-", "-", "-", "-", "-"],
            [15, "-", "-", "-", "-", "-"],
        ]

        let table = array.slice(0, connectionLength)

        // console.log("connection", connection)
        // console.log("connectionLength", connectionLength)
        // console.log("table", table)

        for (let i = 0; i < table.length; i++) {

            //liczenie kolejnych rzędów tabeli
            // console.log("liczenie wierszy", i)
            // let normalPrice = this.showPrice(connection, travelTime)

            if (connection[i].from_point_name.includes("special")) {
                console.log("special point występuje")
            }

            table[i][1] = connection[i].from_point_name
            table[i][2] = connection[i].to_point_name
            table[i][3] = connection[i].mode === "bus" ? `${connection[i].mode} (line: ${connection[i].line_name})` : connection[i].mode
            table[i][4] = connection[i].duration
            table[i][5] = this.showPrice(connection[i].mode, connection[i].duration)
        }

        const row = table.map((table) =>
            <tr>
                <td key={1}>{table[0]}</td>
                <td key={2}>{table[1]}</td>
                <td key={3}>{table[2]}</td>
                <td key={4}>{table[3]}</td>
                <td key={5}>{table[4]}</td>
                <td key={6}>{table[5]}</td>
            </tr>
        )

        const summary = <h6>Total travel time: {duration}, total cost: {null}</h6>

        return (
            <>
                <table className="table table-hover text-center mt-5">
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
                        {summary}
                    </tbody>
                </table>

            </>
        );
    }
}

export default FoundConnection;