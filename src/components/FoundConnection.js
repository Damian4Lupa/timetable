import React, { Component } from 'react';

class FoundConnection extends Component {
    state = {}

    render() {

        let connection = this.props.connection.routes[0].route_parts
        let connectionLength = connection.length
        // let shortestWay = connection[0].route_parts



        console.log(connection, connectionLength)

        return (
            <>
                {/* <div className="row">
                    <p>Earlier</p>

                </div> */}

                <div className="row mt-5">
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
                        <p>{connection[1].mode}</p>
                        <p>{connection[2].mode}</p>
                        <p>{connection[3].mode}</p>
                        <p>{connection[4].mode}</p>
                        <p>{connection[5].mode}</p>
                        <p>{connection[6].mode}</p>


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
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>

                    </div>
                </div>

            </>
        );
    }
}

export default FoundConnection;