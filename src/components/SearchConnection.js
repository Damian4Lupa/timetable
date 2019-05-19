import React, { Component } from 'react';

class SearchConnection extends Component {
    state = {}
    render() {
        return (
            <div class="container">
                <div class="row marginTop">

                    <div class="col">
                        <input class="form-control form-control-lg" type="text" placeholder="FROM" />
                        
                    </div>
                    <div class="col">
                        <input class="form-control form-control-lg" type="text" placeholder="TO" />
                    </div>
                    <div class="col">
                        <input class="form-control form-control-lg" type="date" />
                    </div>
                    <div class="col">
                        {/* <input class="form-control form-control-lg btn-outline-danger" type="button" value="FIND YOUR CONNECTION" /> */}

                        <button type="button" class="btn btn-danger form-control form-control-lg">FIND YOUR CONNECTION</button>

                    </div>
                </div>
            </div>
        );
    }
}

export default SearchConnection;