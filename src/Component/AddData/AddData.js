import React from 'react';
import fakeData from '../../fakeData';

const AddData = () => {
    const add = () => {
            const foodData = fakeData[0];
            console.log(foodData);
            fetch('https://hot-onion-585.herokuapp.com/addData',{
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
               body: JSON.stringify(fakeData) // body data type must match "Content-Type" header
            })
            .then(res=> res.json())
            .then(data=>{
                console.log("success",data);
            })
    }
    return (
        <div>
            <h1>Add</h1>
            <button onClick={add}>Add Data</button>
        </div>
    );
};

export default AddData;