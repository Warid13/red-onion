import React from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckOut = (props) => {
    const [paymentError,setPaymentError] = useState(null);
    const [paymentSuccess,setPaymentSuccess] = useState(null)

    const CARD_OPTIONS = {
        iconStyle: 'solid',
        style: {
          base: {
            iconColor: '#c4f0ff',
            color: '#fff',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {
              color: '#fce883',
            },
            '::placeholder': {
              color: '#87bbfd',
            },
          },
          invalid: {
            iconColor: '#ffc7ee',
            color: '#ffc7ee',
          },
        },
      };
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log('stripe added',error,paymentMethod);
    if(error){
        setPaymentError(error.message);
    }
    else{
        setPaymentSuccess(paymentMethod);
        const payment = {id: paymentMethod.id, last4: paymentMethod.card.last4};
        props.handlePlaceOrders(payment);
        setPaymentError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
       options={{
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      }}
      />
      <button style={{padding:"10px",paddingLeft:"30px",paddingRight:"30px",marginTop:"10px"}} className="btn btn-success" type="submit" disabled={!stripe}>
        Pay
      </button>
      {
          paymentError && <p style={{color:"red"}}>{paymentError}</p>
      }
      {
          paymentSuccess && <p style={{color:"green"}}>Payment Successful</p>
      }
    </form>
  );
};

export default CheckOut;