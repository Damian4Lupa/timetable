import React, { Component } from 'react';

class FoundConnection extends Component {
    state = {}

    showPrice = (mode, duration) => {
        let price = ""
        let number = parseInt(duration)

        if (mode === "bus") {
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
        let connectionLength = (connection.length - 1)

        let table22 = [
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

        let test = table22.slice(0, connectionLength)


        let table = [
            [1, `${connection[1].from_point_name}`, `${connection[1].to_point_name}`, `${connection[1].mode}`, `${connection[1].duration}`, `${connection[1].mode === "foot" ? "-" : this.showPrice(connection[1].mode, connection[1].duration)}`],

            [2, `${connection[2].from_point_name}`, `${connection[2].to_point_name}`, `${connection[2].mode}`, `${connection[2].duration}`, `${connection[2].mode === "foot" ? "-" : this.showPrice(connection[2].mode, connection[2].duration)}`],

            [3, `${connection[3].from_point_name}`, `${connection[3].to_point_name}`, `${connection[3].mode}`, `${connection[3].duration}`, `${connection[3].mode === "foot" ? "-" : this.showPrice(connection[3].mode, connection[3].duration)}`],

            [4, `${connection[4].from_point_name}`, `${connection[4].to_point_name}`, `${connection[4].mode}`, `${connection[4].duration}`, `${connection[4].mode === "foot" ? "-" : this.showPrice(connection[4].mode, connection[4].duration)}`],

            [5, `${connection[5].from_point_name}`, `${connection[5].to_point_name}`, `${connection[5].mode}`, `${connection[5].duration}`, `${connection[5].mode === "foot" ? "-" : this.showPrice(connection[5].mode, connection[5].duration)}`],

            [6, `${connection[6].from_point_name}`, `${connection[6].to_point_name}`, `${connection[6].mode}`, `${connection[6].duration}`, `${connection[6].mode === "foot" ? "-" : this.showPrice(connection[6].mode, connection[6].duration)}`],
        ]




        // console.log(test)
        // console.log(connectionLength)


        const row = table.map((table) =>
            <tr>
                <td>{table[0]}</td>
                <td>{table[1]}</td>
                <td>{table[2]}</td>
                <td>{table[3]}</td>
                <td>{table[4]}</td>
                <td>{table[5]}</td>
            </tr>
        )



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
                    </tbody>
                </table>



                {/* <div className="row mt-5">
                    <div className="col-3 text-center">

                        <h5>From</h5>

                        <p>{connection[1].from_point_name}</p>
                        <p>{connection[2].from_point_name}</p>
                        <p>{connection[3].from_point_name}</p>
                        <p>{connection[4].from_point_name}</p>
                        <p>{connection[5].from_point_name}</p>
                        <p>{connection[6].from_point_name}</p>

                    </div>

                    <div className="col-3 text-center">

                        <h5>To</h5>

                        <p>{connection[1].to_point_name}</p>
                        <p>{connection[2].to_point_name}</p>
                        <p>{connection[3].to_point_name}</p>
                        <p>{connection[4].to_point_name}</p>
                        <p>{connection[5].to_point_name}</p>
                        <p>{connection[6].to_point_name}</p>

                    </div>

                    <div className="col text-center">
                        <h5>Connection</h5>
                        <p>{connection[1].mode}{connection[1].mode === "bus" ? ` (line: ${connection[1].line_name})` : null}</p>
                        <p>{connection[2].mode}{connection[2].mode === "bus" ? ` (line: ${connection[2].line_name})` : null}</p>
                        <p>{connection[3].mode}{connection[3].mode === "bus" ? ` (line: ${connection[3].line_name})` : null}</p>
                        <p>{connection[4].mode}{connection[4].mode === "bus" ? ` (line: ${connection[4].line_name})` : null}</p>
                        <p>{connection[5].mode}{connection[5].mode === "bus" ? ` (line: ${connection[5].line_name})` : null}</p>
                        <p>{connection[6].mode}{connection[6].mode === "bus" ? ` (line: ${connection[6].line_name})` : null}</p>


                    </div>

                    <div className="col text-center">
                        <h5>Travel time</h5>
                        <p>{connection[1].duration}</p>
                        <p>{connection[2].duration}</p>
                        <p>{connection[3].duration}</p>
                        <p>{connection[4].duration}</p>
                        <p>{connection[5].duration}</p>
                        <p>{connection[6].duration}</p>


                    </div>

                    <div className="col text-center">
                        <h5>Normal price</h5>
                        <p>{connection[1].mode === "foot" ? "-" : this.showPrice(connection[1].mode, connection[1].duration)}</p>
                        <p>{connection[2].mode === "foot" ? "-" : this.showPrice(connection[2].mode, connection[2].duration)}</p>
                        <p>{connection[3].mode === "foot" ? "-" : this.showPrice(connection[3].mode, connection[3].duration)}</p>
                        <p>{connection[4].mode === "foot" ? "-" : this.showPrice(connection[4].mode, connection[4].duration)}</p>
                        <p>{connection[5].mode === "foot" ? "-" : this.showPrice(connection[5].mode, connection[5].duration)}</p>
                        <p>{connection[6].mode === "foot" ? "-" : this.showPrice(connection[6].mode, connection[6].duration)}</p>

                    </div>
                </div> */}
            </>
        );
    }
}

export default FoundConnection;