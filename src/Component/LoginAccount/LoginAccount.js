import React from 'react';

import { useForm } from 'react-hook-form';
import './LoginAccount.css';
import Auth from '../Login/useAuth';
import logo from '../../images/ICON/logo2.png'
import { Link } from 'react-router-dom';


const LoginAccount = () => {
    const auth = Auth();

    const { register, handleSubmit, watch, errors } = useForm();



    const handleLoginWithPopUp = () => {
        auth.signInWithGoogle()
            // .then(res => {
            //     window.location.pathname = '/showItemsCarts';
            // })
    }

    const handleLogOut = () => {
        auth.signOut()      
    }

    return (
        <div className="login">
            <div className="login-forms">
            <div className="login-logo">
                    <Link to="/">
                    <img src={logo} alt="" />
                    </Link>
                </div>
            <form>
            <div className="form-group">
                                <input name="email" className="form-control" ref={register({ required: true })} placeholder="Email" />
                                {errors.email && <span className="error">Email is required</span>}
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control" ref={register({ required: true })} placeholder="Password" />
                                {errors.password && <span className="error">Password is required</span>}
                            </div>
                {/* <button className="popup-btn">Login</button> */}
                <input style={{background:"#F91944"}} className="login-btn" type="submit" value="Sign In" />
                {
                    auth.user ?  <button className="popup-btn" onClick={handleLogOut}>Sign Out</button> :<button className="popup-btn btn-success" onClick={handleLoginWithPopUp}>Sign In Google</button> 
                        
                }
                {/* {
                    auth.user.error && <p>{auth.user.error}</p>
                } */}
                <p className="acc-link" style={{marginLeft:"140px"}}><a href="/signUp">Create a new Account</a></p>
            </form >
            </div>
          
        </div>
    );
};

export default LoginAccount;