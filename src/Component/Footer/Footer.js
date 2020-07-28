import React from 'react';
import "./Footer.css";
import footerLogo from "../../images/ICON/logo.png"
const Footer = () => {
    return (
        <div>
            <footer className="page-footer font-small  blue pt-4">
                <div className="container-fluid text-center text-md-left">
                    <div className="row">
                        <div className="col-md-6 mt-md-0 mt-3">

                           <img style={{width:"30%"}} src={footerLogo} alt=""/>
                            <p  className="footer-brand" >A luxurious food restaurant for your perfect choice</p>

                        </div>
                        <div className="col-md-3 mb-md-0 mb-3">

                            <ul className="list-unstyled">
                                <li>
                                    <a href="/">About Online Food</a>
                                </li>
                                <li>
                                    <a href="/">Read Our Blog</a>
                                </li>
                                <li>
                                    <a href="/">SignUp For Deliver</a>
                                </li>
                                <li>
                                    <a href="/">Add Your Restaurant</a>
                                </li>
                            </ul>

                        </div>
                        <div className="col-md-3 mb-md-0 mb-3">
                            <ul className="list-unstyled">
                                <li>
                                    <a href="/">Get Help</a>
                                </li>
                                <li>
                                    <a href="#!">Read FAQ</a>
                                </li>
                                <li>
                                    <a href="#!">View All Cities</a>
                                </li>
                                <li>
                                    <a href="#!">Restaurant near me</a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div class="container">
                    <ul className="list-unstyled-2 list-inline text-center py-2">
                        <li className="list-inline-item">
                            <h5 className="mb-1">Register for free</h5>
                        </li>
                        <li className="list-inline-item">
                            <a href="#!" className="btn-outline">Sign up!</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-copyright text-center py-3">© 2020 Copyright:
                         <a href="/"> hotonion.com</a>
                </div>

            </footer>
        </div>
    );
};

export default Footer;