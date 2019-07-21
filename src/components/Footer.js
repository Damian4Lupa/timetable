import React from 'react';
import googlePay from './img/googlepay.png'
import appStore from './img/appstore.png'

const Footer = () => {
    return (
        <>
            <footer className="text-white blue">
                <div className="container py-5 mt-5">

                    <div className="row">



                        <div className="col-3 col-md">
                            <h5>United Kingdom Railways</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="#">KOLEO calendars</a></li>
                                <li><a className="text-muted" href="#">Join us!</a></li>
                                <li><a className="text-muted" href="#">What our clients say about us</a></li>
                                <li><a className="text-muted" href="#">International train tickets</a></li>

                            </ul>
                        </div>
                        <div className="col-3 col-md">
                            <h5>For passengers</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="#">Current timetable</a></li>
                                <li><a className="text-muted" href="#">Train ticket prices</a></li>
                                <li><a className="text-muted" href="#">Android app</a></li>
                                <li><a className="text-muted" href="#">Popular connections</a></li>
                            </ul>
                        </div>
                        <div className="col-3 col-md">
                            <h5>Useful information</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="#">Help</a></li>
                                <li><a className="text-muted" href="#">Terms of service</a></li>
                                <li><a className="text-muted" href="#">Privacy/Cookies</a></li>
                                <li><a className="text-muted" href="#">Contact us</a></li>
                            </ul>
                        </div>
                        <div className="col-3 col-md">
                            <a href="https://play.google.com/store" target="_blank">
                                <img src={googlePay} alt="googleApp" height="65" />
                            </a>
                            <a href="https://www.apple.com/pl/ios/app-store/" target="_blank">
                                <img src={appStore} alt="googleApp" height="65" />
                            </a>
                        </div>
                    </div>
                    <div className="text-center text-small font-weight-light mt-5">
                        <p>© United Kingdom Railways 2019 All rights reserved - The website uses cookies.</p>
                    </div>
                </div>

            </footer>


        </>
    )
}

export default Footer