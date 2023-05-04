import React , { useState } from 'react';
import CartTickett from '../components/CartTickett';
const pannier =({ data, reservedVoyages })=> {
   
      
    
  return (


    <>
    
    <CartTickett cartItems={data} reservedVoyages={reservedVoyages} /> 
      
    </>
  );
};

export default pannier;