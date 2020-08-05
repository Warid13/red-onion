import React, { useContext } from 'react';
import logo from '../../images/ICON/logo2-removebg-preview.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Header.css'
import { useAuth } from '../Login/useAuth';
import { Link } from 'react-router-dom';



const Header = () => {
    const auth = useAuth();
    console.log(auth);
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light">
                <a class="navbar-brand logo" href="/"><img src={logo} alt="" /></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="/"> <p className="cart-icon"><FontAwesomeIcon icon={faShoppingCart} /></p> <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/"> {
                                auth.user && <span>Welcome <br /> {auth.user.name}</span>

                                // <button className="btn btn-info">Login</button>
                            }</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/">{
                                auth.user ? <Link to="/signUp"> <button className="my-button" onClick={auth.signOut}>SignOut</button> </Link> : <a className="my-button" href="/signUp">Login</a>

                            }
                                <Link to="/signUp"> <button className="signup-button">SignUp</button></Link></a>
                        </li>

                    </ul>
                </div>
            </nav>


            {/* <nav>
                <a href="/breakfast">Breakfast</a>
                <a href="/lunch">Lunch</a>
                <a href="/dinner">Dinner</a>
            </nav> */}
        </div>
    );
};

export default Header;