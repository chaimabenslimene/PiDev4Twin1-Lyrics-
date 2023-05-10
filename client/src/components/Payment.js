import React, { useState, useEffect } from "react";
import axios from "axios";

import { calculateTotalPrice } from './CartTickett';

const Payment = ({ cartItems }) => {

  // Utilize the variable cartItems here
  const numItems = cartItems.length;

  const totalPrice = calculateTotalPrice(cartItems);

  const onSubmit = (e) => {
    
    e.preventDefault();
  
    axios
    .post("http://localhost:5000/api/payment", { amount: totalPrice })
    .then((res) => {
      const { result } = res.data;
      window.location.href = result.link;
    })
    .catch((err) => console.error(err));
  };

  return (
    <div className="container shadow my-5">
    <div className="p-4">
      <center>
      <h2><i className="fas fa-money-bill"></i> Payment page</h2>

      <p>Total: {calculateTotalPrice(cartItems)}</p>
      <form className="m-4" onSubmit={onSubmit}>
      <button className="btn btn--primary" style={{ backgroundColor: 'gray', color: 'white', fontWeight: 'bold' }}><i className="fas fa-money-bill"></i> Payer</button>


      </form>
      </center>
    </div>
    </div>
  );
}

export default Payment;
