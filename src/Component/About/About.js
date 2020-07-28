import React from 'react';
import image1 from "../../images/Image/adult-blur-blurred-background-687824.png";
import image2 from "../../images/Image/chef-cook-food-33614.png";
import image3 from "../../images/Image/architecture-building-city-2047397.png";
import logo1 from "../../images/Image/car.png";
import logo2 from "../../images/Image/notification.png";
import logo3 from "../../images/Image/bus.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faArrowRight } from '@fortawesome/free-solid-svg-icons'


import "./About.css";

const About = () => {
    return (
        <div className="container">
            <div className="about-text">
                <h1 className="display-4">Why you choose us</h1>
                <p>The Restaurant Expert’s blogs doesn’t just produce <br /> listicles for the sake of producing content, every piece they produce</p>

            </div>
            <div className="row">
                <div className="col-md-4 about-col">
                    <img className="a-image" src={image1} alt="" />
                    <div className="about-delivery">
                        <div className="logo-about">
                            <img style={{ width: "70%" }} src={logo1} alt="" />
                        </div>
                        <div className="text">
                            <h4>For Delivery</h4>
                            <p className="text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque harum eum quisquam atque cupiditate corporis facilis rem mollitia? Inventore dolores ad iste aut quam, quo atque possimus vero hic molestiae?</p>
                            <a style={{ color: "green" }} href="/">See More <FontAwesomeIcon icon={faArrowRight} /></a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 about-col">
                    <img className="a-image" src={image2} alt="" />
                    <div className="about-delivery">
                        <div className="logo-about">
                            <img style={{ width: "70%" }} src={logo2} alt="" />
                        </div>
                        <div className="text">
                            <h5>A Good Auto Responder</h5>
                            <p className="text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque harum eum quisquam atque cupiditate corporis facilis rem mollitia? Inventore dolores ad iste aut quam, quo atque possimus vero hic molestiae?</p>
                            <a style={{ color: "green" }} href="/">See More <FontAwesomeIcon icon={faArrowRight} /></a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 about-col">
                    <img className="a-image" src={image3} alt="" />
                    <div className="about-delivery">
                        <div className="logo-about">
                            <img style={{ width: "70%" }} src={logo3} alt="" />
                        </div>
                        <div className="text">
                            <h4>Home Delivery</h4>
                            <p className="text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque harum eum quisquam atque cupiditate corporis facilis rem mollitia? Inventore dolores ad iste aut quam, quo atque possimus vero hic molestiae?</p>
                            <a style={{ color: "green" }} href="/">See More <FontAwesomeIcon icon={faArrowRight} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;