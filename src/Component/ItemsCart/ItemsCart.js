import React from 'react';
import './ItemsCart.css'
const ItemsCart = (props) => {

    // console.log(props.foodItem.name);
    const { id,name, img, quantity, price } = props.foodItem;
    console.log(props.foodItem.length);


    return (

        <div className="review-items">
            <div className="review-items-1">
                <div className="image">
                    <img src={img} alt="" />
                </div>
                <div className="body">
                    <h6>name: {name}</h6>
                    <p>Quantity {quantity}</p>
                    <p>Price : {price * quantity}</p>
                </div>
            </div>
            <div>
                <div className="btn">
                    <button onClick={() => props.handleRemoveItem(id)}>X</button>
                </div>
            </div>
        </div>
    );
};

export default ItemsCart;