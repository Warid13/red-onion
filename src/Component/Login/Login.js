import React, { useRef } from 'react';
import Auth from './useAuth';
import './Login.css'
import logo from '../../images/ICON/logo2.png'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const auth = Auth();
    //*************************************************** */
    const handleLoginWithPopUp = () => {
        auth.signInWithGoogle()
            // .then(res => {
            //     window.location.pathname = '/showItemsCarts';
            // })
    }

    const handleLogOut = () => {
        auth.signOut()
            
    }

    //*************************************************** */
    const [isSignedIn, setIsSignedIn] = useState(false);

    const onSubmit = data => {
        if (isSignedIn) {
            if (data.email && data.password) {
                auth.signIn(data.email, data.password);
            }
        } else {
            if (data.name && data.email && data.password && data.confirm_password) {
                auth.signUp(data.email, data.confirm_password, data.name)
                
            }
        }

    }




    //*************************************************** */


    //*************************************************** */
    const { register, handleSubmit, watch, errors } = useForm();
    // const onSubmit = data => { console.log(data) }

    console.log(watch('example')) // watch input value by passing the name of it

    const password = useRef({});
    password.current = watch("password", "");
    return (
        <div className="body-login">
            <div className="login-form">
                <div className="login-logo">
                    <Link to="/">
                    <img src={logo} alt="" />
                    </Link>
                </div>
                {
                    isSignedIn ?
                        <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                            {
                                auth.user != null && <p className="text-danger">* {auth.user.error}</p>
                            }
                            <div className="form-group">
                                <input name="email" className="form-control" ref={register({ required: true })} placeholder="Email" />
                                {errors.email && <span className="error">Email is required</span>}
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control" ref={register({ required: true })} placeholder="Password" />
                                {errors.password && <span className="error">Password is required</span>}
                            </div>

                            <div className="form-group">
                                <button  style={{marginLeft:"0px"}} className="btn btn-danger btn-block" type="submit">Sign In</button>
                            </div>
                            <div className="form-group">
                                {
                                    auth.user ? <button  style={{marginLeft:"0px"}} className="btn btn-danger btn-block" onClick={handleLogOut}>Sign Out</button> : <button  style={{marginLeft:"0px"}} className="btn btn-success btn-block" onClick={handleLoginWithPopUp}>Sign In Google</button>

                                }
                            </div>
                            <div className="option text-center">
                                <label onClick={() => setIsSignedIn(false)}>Create a new Account</label>
                            </div>
                        </form>
                        :
                        <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                            {
                                auth.user != null && <p className="text-danger">* {auth.user.error}</p>
                            }
                            <div className="form-group">
                                <input name="name" className="form-control" ref={register({ required: true })} placeholder="Name" />
                                {errors.name && <span className="error">Name is required</span>}
                            </div>
                            <div className="form-group">
                                <input name="email" className="form-control" ref={register({ required: true })} placeholder="Email" />
                                {errors.email && <span className="error">Email is required</span>}
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control" ref={register({ required: true })} placeholder="Password" />
                                {errors.password && <span className="error">Password is required</span>}
                            </div>
                            <div className="form-group">
                                <input type="password" name="confirm_password" className="form-control" ref={register({
                                    validate: (value) => value === watch('password')
                                })} placeholder="Confirm Password" />
                                {errors.confirm_password && <span className="error">Passwords don't match.</span>}
                            </div>
                            <div className="form-group">
                                <button style={{marginLeft:"0px"}} className="btn btn-danger btn-block btn-custom" type="submit">Sign Up</button>
                            </div>
                            <div className="option text-center">
                                <label onClick={() => setIsSignedIn(true)}>Already Have an Account</label>
                            </div>
                        </form>

                }
            </div>
        </div>
        //*************************************************** */

    );
};

export default Login;