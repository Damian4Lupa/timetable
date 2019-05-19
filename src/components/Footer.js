import React from 'react';
import googleApp from './img/google.png'

const Footer = () => {
    return (
        <>
            <footer className="text-white blue">
                <div class="container py-5 mt-5">

                    <div class="row">



                        <div class="col-3 col-md">
                            <h5>Company name</h5>
                            <ul class="list-unstyled text-small">
                                <li><a class="text-muted" href="#">KOLEO calendars</a></li>
                                <li><a class="text-muted" href="#">Join us!</a></li>
                                <li><a class="text-muted" href="#">What our clients say about us</a></li>
                                <li><a class="text-muted" href="#">International train tickets</a></li>

                            </ul>
                        </div>
                        <div class="col-3 col-md">
                            <h5>For passengers</h5>
                            <ul class="list-unstyled text-small">
                                <li><a class="text-muted" href="#">Current timetable</a></li>
                                <li><a class="text-muted" href="#">Train ticket prices</a></li>
                                <li><a class="text-muted" href="#">Android app</a></li>
                                <li><a class="text-muted" href="#">Popular connections</a></li>
                            </ul>
                        </div>
                        <div class="col-3 col-md">
                            <h5>Useful information</h5>
                            <ul class="list-unstyled text-small">
                                <li><a class="text-muted" href="#">Help</a></li>
                                <li><a class="text-muted" href="#">Terms of service</a></li>
                                <li><a class="text-muted" href="#">Privacy/Cookies</a></li>
                                <li><a class="text-muted" href="#">Contact us</a></li>
                            </ul>
                        </div>
                        <div class="col-3 col-md">
                            <img src={googleApp} alt="googleApp" height="135" />
                        </div>
                    </div>
                    <div class="text-center text-small font-weight-light mt-5">
                        <p>© CompanyName 2019 All rights reserved - The website uses cookies.</p>
                    </div>
                </div>

            </footer>


        </>
    )
}

export default Footer