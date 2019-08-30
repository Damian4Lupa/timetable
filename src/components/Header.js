import React from 'react';
import icon from './img/icon.png'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm blue">
            <div className="container">

                <a className="navbar-brand" href="#">
                    <img src={icon} width="35" height="35" className="d-inline-block align-top mr-2" alt="icon" />
                    United Kingdom Transport
                    </a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>

                </button>

                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item">
                            <a className="nav-link" href="#">Login</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">Sign up</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Header