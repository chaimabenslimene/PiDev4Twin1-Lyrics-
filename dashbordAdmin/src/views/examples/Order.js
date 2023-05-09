import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  
    Card,
    CardHeader,
    Container,
    Row
  } from "reactstrap";
  import Header from "components/Headers/Header.js";
const Order = () => {
  const [cartsWithUserNames, setCartsWithUserNames] = useState([]);

  useEffect(() => {
    async function fetchCarts() {
      const response = await axios.get('http://localhost:5000/api/cart/carts');
      setCartsWithUserNames(response.data);
    }
    fetchCarts();
  }, []);

  return (
    <>
     <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Order</h3>
              </CardHeader>
   
              <table class="table">
  <thead>
           <tr>
            
            <th>User Name</th>
            <th>les détailles de reservation pour chaque utilisateur</th>
          </tr>
        </thead>
        <tbody>
          {cartsWithUserNames.map(cart => (
             <tr key={cart.userId}>
             <td style={{width: '50%'}}>{cart.userName}</td>
             <td style={{width: '50%'}}>
                <ul>
                  {cart.items.map(item => (
                    <li key={item._id}>
                      {item.voyage.name}  
                      {item.voyage.depart}  →  {item.voyage.destination}  <br></br>la quantity :{item.quantity}  <br></br> le price par unité {item.voyage.prixticket} 
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </Card>
          </div>
        </Row>
      
             
             
       
         
      </Container>
    </>
  );
};

export default Order;