import React, { Component } from 'react';

class FoundConnection extends Component {
    state = {}
    render() {
        return (
            <>
                <div className="row">
                    <p>Earlier</p>

                </div>

                <div className="row">
                    <div className="col-3">
                        <center>
                            <h6>From</h6>

                            <p>22:15</p>
                            <p>23:23</p>

                        </center>


                    </div>

                    <div className="col-3">
                        <center>
                            <h6>To</h6>

                            <p>12:15</p>
                            <p>15:23</p>

                        </center>

                    </div>

                    <div className="col">
                        <h6>Connection</h6>


                    </div>

                    <div className="col">
                        <h6>Travel time</h6>

                    </div>

                    <div className="col">
                        <h6>Normal price</h6>

                    </div>
                </div>

            </>
        );
    }
}

export default FoundConnection;