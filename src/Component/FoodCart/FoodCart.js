import React from 'react';
import './FoodCart.css'
import { Link } from 'react-router-dom';
const FoodCart = (props) => {
    console.log(props);
    const { id, name, description, img, price } = props.food;
    return (
      
        <Link style={{textDecoration:"none",color:"black"}} to={"/menuItems/"+id}>
            <div className="my-card">
                <div className="row">
                    <div className="card-img-top">
                        <img style={{ width: "80%", marginTop: "5px" }} src={img} alt="" />
                    </div>
                    <div className="card-body">
                        <h6>{name}</h6>
                        <p>{description}</p>
                        <p>${price}</p>
                    </div>
                </div>
            </div>
        </Link>
       
    );
};

export default FoodCart;