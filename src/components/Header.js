import React from 'react';
import icon from './img/icon.png'

const Header = () => {
    return (



        <nav class="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm blue">
            <div class="container">

                <a class="navbar-brand" href="#">
                    <img src={icon} width="35" height="35" class="d-inline-block align-top mr-2" alt="icon" />
                    Bootstrap
                    </a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>

                </button>

                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">

                        <li class="nav-item">
                            <a class="nav-link" href="#">Login</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#">Sign up</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Header