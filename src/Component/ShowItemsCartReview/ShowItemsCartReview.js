import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ItemsCart from '../ItemsCart/ItemsCart';
import FoodCart from '../FoodCart/FoodCart';
import './ShowItemsCartReview.css'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Login/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOut from '../CheckOut/CheckOut';

const ShowItemsCartReview = () => {
    const [foods, setFoods] = useState([]);
    const [foodCart, setFoodCart] = useState([]);
    const [address, setAddress] = useState({
        flat: "",
        business: "",
        delivery: "",
        disabled: true
    });

    const [shipInfoAdded,setShipInfoAdded] = useState(null);
    const [orderSuccess,setOrderSuccess] = useState(null);

    const stripePromise = loadStripe('pk_test_VX7COehSNQtC4I6sU5jNXeRQ00r42EFsBl');

    useEffect(() => {
        fetch('https://hot-onion-585.herokuapp.com/foodData')
            .then(res => res.json())
            .then(data => {
                // console.log("data",data);
                setFoods(data);
            })
    }, [])
   

    const handleChange = event => {
        const newUserInfo = {
            ...address,
            disabled: false
        };
        newUserInfo[event.target.name] = event.target.value;
     
        setAddress(newUserInfo);
    }

    const handleRemoveItem = (itemsId) => {
        const newFoodItem = foodCart.filter(fdId => fdId.id !== itemsId);
        setFoodCart(newFoodItem);
        removeFromDatabaseCart(itemsId);
    }
    useEffect(() => {
        const saveFoodCart = getDatabaseCart();
        const foodId = Object.keys(saveFoodCart);
        if (foods.length) {
            const foodItem = foodId.map(id => {
                const item = foods.find(fdId => fdId.id === id);
                item.quantity = saveFoodCart[id];
                return item;
            });
            setFoodCart(foodItem);
            // console.log(foodItem);
        }

    }, [foods])
    let total = 0;
    let shippingCost = 0;
    let delivery = 0;

    for (let i = 0; i < foodCart.length; i++) {
        const foodItem = foodCart[i];
        total = total + (foodItem.price * foodItem.quantity);
    }
    if (total > 0) {
        shippingCost = 2.00;
    }
    if (total > 0) {
        delivery = 2.00;
    }
    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shippingCost + Number(tax)).toFixed(2) + delivery;


    const handlePlaceOrder = () => {
        // console.log("clicked");
    }



    //**************************************************** */
    const { register, handleSubmit, watch, errors } = useForm();
    const auth = useAuth();
    const onSubmit = data => {
        setShipInfoAdded(data);
    }

    const handlePlaceOrders = (payment) => {
        console.log(auth.user.name);
        // const saveCart = getDatabaseCart();
        const orderDetails = {
            email: auth.user.email,
            name: auth.user.name,
            shipment: shipInfoAdded,
            payment: payment
        };
        fetch('https://hot-onion-585.herokuapp.com/placeOrder', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(orderDetails) // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(order => {
                setOrderSuccess(order._id);
                // console.log("Order placed", order);
                // alert("Successfully placed your order your order id is:" + order._id);
                //clear cart
            })
    }
    return (
        <div>
            <nav className="d-flex justify-content-center menu-list">
                <a href="/breakfast">Breakfast</a>
                <a href="/lunch">Lunch</a>
                <a href="/dinner">Dinner</a>
            </nav>
            <div className="items-cart-body">
                <div className="form">
                    <div style={{display: shipInfoAdded && 'none'}} className="form-body">
                        <h6>Edit Delivery Details</h6><hr className="hr" />
                        < form onSubmit={handleSubmit(onSubmit)} >
                            < input defaultValue="Delivery to door" name="deliveryDoor" ref={register({ required: true })} />
                            {errors.deliveryDoor && <span>This field is required</span>}

                            < input defaultValue="107 Rd No 8" name="roadNo" ref={register({ required: true })} />
                            {errors.roadNo && <span>This field is required</span>}

                            < input name="flat" onBlur={handleChange} ref={register({ required: true })} placeholder="Flat,suit amd floor" />
                            {errors.flat && <span className="err">This field is required</span>}

                            < input name="businessName" onBlur={handleChange} ref={register({ required: true })} placeholder="Business Name" />
                            {errors.businessName && <span className="err">This field is required</span>}

                            < input name="deliveryInstruction" onBlur={handleChange} ref={register({ required: true })} placeholder="Add Delivery Instruction" />
                            {errors.deliveryInstruction && <span className="err">This field is required</span>} <br />

                            {/* <input type="submit" /> */}
                            <button className="details-btn" type="submit">Submit</button>
                        </form >
                    </div>
                    <div style={{display: shipInfoAdded ? 'block': 'none' }} className="payment">
                        <div className="container">
                        <h1>Shipment</h1>
                        <Elements stripe={stripePromise}>
                            <CheckOut handlePlaceOrders={handlePlaceOrders}></CheckOut>
                        </Elements>
                        </div>
                       
                        <br/>
                      {
                      orderSuccess && 
                       <div>
                            <h1>Thankyou For Shopping</h1>
                      <p>Your order id is {orderSuccess}</p>
                      <p>Click to PlaceOrder to placed your order </p>
                        </div>}
                    </div>

                </div>
                <div className="order-food-review">
                    {
                        foodCart.map(fd =>
                            <ItemsCart
                                handleRemoveItem={handleRemoveItem}
                                foodItem={fd} ></ItemsCart>
                        )
                    }
                    {
                        !foodCart.length && <h1>No Items Added <a href="/items"> Keep Shopping</a></h1>
                    }
                    <p>Subtotal : {total}</p>
                    <p>Shipping Cost : {shippingCost}</p>
                    <p> Tax : {tax}</p>
                    <p>Delivery Fee : {delivery}</p>
                    <p>Total : {grandTotal}</p>
                    <Link to="/delivery">
                        <button
                            style={{ backgroundColor: "#F91944", border: "none" }}
                            className="btn-place-order btn btn-primary"
                            onClick={handlePlaceOrder}
                            // disabled={address.disabled}
                            disabled={!shipInfoAdded}

                        >Place Order</button>
                    </Link>
                </div>
            </div>


        </div>
    );
};

export default ShowItemsCartReview;