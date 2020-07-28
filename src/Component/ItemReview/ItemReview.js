import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ItemReview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import ItemsCart from '../ItemsCart/ItemsCart';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';

const ItemReview = () => {
    const [count, setCount] = useState(1);
    const [itemCart,setItemCart] = useState([]);
    // const [foodItems,setFoodItems] = useState(null);
    const [foods,setFoods] = useState([]);
    
    useEffect(()=>{
        fetch('https://hot-onion-585.herokuapp.com/foodData')
        .then(res=>res.json())
        .then(data=>{
            console.log("data",data);
            setFoods(data);
        })
},[])
    const { id } = useParams();
    const foodItem = foods.find(food => food.id === id);
    console.log(foodItem);
    const handleAddFood = (foodItem) =>{
        console.log(foodItem);
        const newItemCart = [...itemCart, foodItem];
        setItemCart(newItemCart);
        addToDatabaseCart(foodItem.id,count);
    }
    return (
        <div className="container">
            <nav className="d-flex justify-content-center menu-list">
                <a href="/breakfast">Breakfast</a>
                <a href="/lunch">Lunch</a>
                <a href="/dinner">Dinner</a>
            </nav>
            <div className="row">
                <div className="col-md-6 dinner-details">
                    <h1>{foodItem && foodItem.name}</h1>
                    <h6>{foodItem && foodItem.description}</h6>
                    <div className="price-button">
                        <div className="price">
                            <p>${foodItem && (foodItem.price * count).toFixed(2)}</p>
                        </div>
                        <div className="cart-button">
                            <button onClick={() => setCount(count - 1)}>-</button>
                            <span>{count}</span>
                            <button onClick={() => setCount(count + 1)}>+</button>
                        </div>
                    </div>

                    <br />
                    <Link to="/showItemsCarts">
                    <button
                    onClick={() => handleAddFood(foodItem)}
                    className="add-to-cart"><FontAwesomeIcon icon={faShoppingCart}
                    /> Add</button>
                    </Link>
                    {/* <ItemsCart itemCart={itemCart}></ItemsCart> */}
                </div>
                <div className="col-md-6 check-img">
                    <img style={{ width: "70%" }} src={foodItem && foodItem.img} alt="" />
                </div>
                {/* <Dinner dinnerFood={dinner}></Dinner> */}

            </div>
        </div>
    );
};

export default ItemReview;