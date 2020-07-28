import React, { useContext, useEffect } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, createContext } from "react";
import { Route,Redirect } from "react-router-dom";

//*****************/ Fire base Initialization ************************
firebase.initializeApp(firebaseConfig);
//*****************/ Fire base Initialization end ************************


const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

//*****************/ Redirect review item to login ************************
export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signUp",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
//*****************/ Redirect review item to login end ************************



//*** Created Function******************* */


//*************Editing Start****************/


const Auth = () => {

  const getUser = user => {
    const { email, displayName, password } = user;
   return { email, name: displayName, password: password };
}

     const [user, setUser] = useState(null)

     useEffect(() => {
      firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
              const currentUser = getUser(user);
              setUser(currentUser);
          } else {
              // No user is signed in.
          }
      });
  }, [])

    const provider = new firebase.auth.GoogleAuthProvider();

    // const handleChange = event =>{
    //   // console.log(event.target.name,event.target.value);
    //   const newUserInfo = {
    //       ...user
    //   };
    //   newUserInfo[event.target.name] = event.target.value;
    //   console.log(newUserInfo);
    //   setUser(newUserInfo);
    // };

    const signInWithGoogle = () => {
        //*****************/ sign in with popup Start ************************
        return firebase.auth().signInWithPopup(provider)
        .then(res => {
          const { displayName, password, email } = res.user;
          const signedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            password: password
          }
          setUser(signedInUser);
          window.location.pathname = '/'; 
          console.log(displayName, password, email);
        })
        .catch(err => {
          console.log(err);
          console.log(err.message);
        })
        //*****************/ sign in with popup End ************************
    }

    // const createAccount = (e) => {
    //   // if (user.isValid) {
    //     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    //     .then(res => {
    //       const { displayName, password, email } = res.user;
    //       const signedInUser = {
    //         isSignedIn: true,
    //         name: user.name,
    //         email: email,
    //         photo: password
    //       }
    //       setUser(signedInUser);
    //       console.log(displayName, password, email);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       console.log(err.message);
    //     })
    //     console.log(user.email, user.password);
    //   // }
    //   e.preventDefault();
    //   e.target.reset();
    // }

    // const signInUser = e => {
    //   // if (user.isValid) {
    //     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    //      .then(res => {
    //       const { displayName, password, email } = res.user;
    //       const signedInUser = {
    //         isSignedIn: true,
    //         name: displayName,
    //         email: email,
    //         password: password
    //       }
    //       setUser(signedInUser);
    //       console.log(displayName, password, email);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       console.log(err.message);
    //     })
    //     // console.log(user.email, user.password);
    //   // }
    //   e.preventDefault();
    //   e.target.reset();
    // }


    // ************************start*****************
    const signIn = (email,password) => {
      return firebase.auth().signInWithEmailAndPassword(email,password)
     .then(res => {
         setUser(res.user);
         window.history.back(); 
      })
      .catch(err=> setUser({error: err.message}))
  }

 

  const signUp = (email, password, name) => {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
          firebase.auth().currentUser.updateProfile({
              displayName: name
          }).then(() => {
            setUser(res.user);
            window.location.pathname = '/'; 
          });
      })
      .catch(err=> setUser({error: err.message}))
  }


    //*****************/ sign Out  Start ************************
    const signOut = () => {
        firebase.auth().signOut()
            .then(function () {
                setUser(null);
            })
            .catch(function (error) {

            });
    }
    
    //*****************/ sign Out  End ************************
    //************ */
   

    

    return {
        user,
        signOut,
        signInWithGoogle,
        // handleChange,
        // createAccount,
        // signInUser
        signIn,
        signUp
    }
}

export default Auth;