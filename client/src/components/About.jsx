import React from 'react';
import { NavLink } from 'react-router-dom';
import bgImage from '../video/imen.mp4';
import { useMediaQuery } from 'react-responsive';

const About = () => {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    return (

        <div>
            <center>

                <video autoPlay muted loop width="1500" height="800">
                    <source src={bgImage} type="video/mp4" />
                </video>
            </center>
            <br />
            <section id="about" className="pb-5">
                <div className="container my-5 py-5">
                    <div className="row">
                        <div className="col-md-6">
                            <img src="./image/bus.png" alt="About" className="w-75 mt-2" />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fs-5 mb-0">About Us</h3>
                            <h1 className="display-6 mb-2">Who <b>We</b> Are</h1>
                            <hr className="w-50" />
                            <p className="lead mb-4">We are a platform where you can book bus tickets online, without having to physically go to a travel agency. Online bus ticket booking sites allow travelers to search for routes, compare prices and schedules, select seats and pay for tickets online.</p>
                            <NavLink className="btn btn-primary rounded-pill px-4 py-2" to="/register"> Get Started</NavLink>

                            <button className="btn btn-outline-primary rounded-pill px-4 py-2 ms-2">Contact Us</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
