import React, { createContext } from 'react';
import './App.css';
import Header from './Component/Header/Header';
import Items from './Component/Items/Items';
import Login from './Component/Login/Login';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ItemReview from './Component/ItemReview/ItemReview';
import Error from './Error/Error';
import ShowItemsCartReview from './Component/ShowItemsCartReview/ShowItemsCartReview';
import Delivery from './Component/Delivery/Delivery';
import { AuthContextProvider, PrivateRoute } from './Component/Login/useAuth';
import LoginAccount from './Component/LoginAccount/LoginAccount';
import About from './Component/About/About';
import Footer from './Component/Footer/Footer';
import Banner from './Component/Banner/Banner';
import AddData from './Component/AddData/AddData';




function App() {
  return (
    <div>
      <AuthContextProvider>

        {/* <Header></Header> */}
        <Router>
          <Switch>
            <Route path="/items">
              <Header></Header>
              <Banner></Banner>
              <Items></Items>
              <About></About>
              <Footer></Footer>
            </Route>
            {/* <Route path="/itemReview">
          </Route> */}
            <Route path="/breakfast">
              <Header></Header>
              <Banner></Banner>
              <Items></Items>
              <About></About>
              <Footer></Footer>
            </Route>
            <Route path="/lunch">
              <Header></Header>
              <Banner></Banner>
              <Items></Items>
              <About></About>
              <Footer></Footer>
            </Route>
            <Route path="/dinner">
              <Header></Header>
              <Banner></Banner>
              <Items></Items>
              <About></About>
            </Route>
            <Route path="/addData">
              <AddData></AddData>
            </Route>

            <Route exact path="/">
              <Header></Header>
              <Banner></Banner>
              <Items></Items>
              <About></About>
              <Footer></Footer>
            </Route>
            <PrivateRoute path="/showItemsCarts">
              <Header></Header>
              <ShowItemsCartReview></ShowItemsCartReview>
              <Footer></Footer>
            </PrivateRoute>
            {/* <PrivateRoute path="/showItemsCart">
              <Header></Header>
              <ShowItemsCartReview></ShowItemsCartReview>
              <Footer></Footer>
            </PrivateRoute> */}
            <Route path="/delivery">
              <Header></Header>
              <Delivery></Delivery>
              <Footer></Footer>
            </Route>
            <Route path="/signUp">
            
              <Login></Login>
            </Route>
            <Route path="/l">
              <LoginAccount></LoginAccount>
            </Route>
            {/* <Route path="/loginAccount">
            <Header></Header>
              <LoginAccount></LoginAccount>
            </Route> */}
            <Route path="/menuItems/:id">
              <Header></Header>
              <ItemReview></ItemReview>
              <Footer></Footer>
            </Route>

            <Route path="*">
              <Error></Error>
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
