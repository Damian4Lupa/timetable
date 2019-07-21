import React, { Component } from 'react';

class FoundConnection extends Component {
    state = {}
    render() {

        let connection = this.props.connection
        let stationTo = this.props.stationTo

        return (
            <>
                {/* <div className="row">
                    <p>Earlier</p>

                </div> */}

                <div className="row mt-5">
                    <div className="col-3 text-center">
                     
                            <h5>From</h5>

                            <p>22:15</p>
                            <p>23:23</p>

                        


                    </div>

                    <div className="col-3 text-center">
                        
                            <h5>To</h5>

                            <p>12:15</p>
                            <p>15:23</p>

                      

                    </div>

                    <div className="col text-center">
                        <h5>Connection</h5>


                    </div>

                    <div className="col text-center">
                        <h5>Travel time</h5>

                    </div>

                    <div className="col text-center">
                        <h5>Normal price</h5>

                    </div>
                </div>

            </>
        );
    }
}

export default FoundConnection;