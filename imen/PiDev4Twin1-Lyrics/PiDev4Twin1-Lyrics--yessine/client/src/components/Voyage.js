
import { useState } from "react";
²²  

// core components

import axios from 'axios';
import React, { useEffect } from 'react';





 
const Voyage = () => {
const [data, setData] = useState([]);
const [showPopup, setShowPopup] = useState(false);
const [editUser, setEditUser] = useState(null);
async function fetchAllData() {
  try {
    const response = await axios.get('http://localhost:5000/api/Voyage/'); //le chemin d'accès de votre API Express
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
useEffect(() => {
  async function getData() {
    const result = await fetchAllData();
    setData(result);
  }
  getData();
}, []);

 
   
  
 




 
  return (
    <>
   
   <video autoPlay muted loop>
        <source src ={bgImage} type="video/mp4"/></video>
      <table class="table">
     
  <thead>
    <tr>
      <th scope="col">Date de départ</th>
      <th scope="col">Nombre de places</th>
      <th scope="col">Prix du ticket</th>
      <th scope="col">Départ</th>
      <th scope="col">Destination</th>
      <th scope="col">Type de bus</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
 

  <tbody>
    {data.map((item) => (
      <tr key={item._id}>
        <td>{item.datedepart}</td>
        <td>{item.nbrplace}</td>
        <td>{item.prixticket}</td>
        <td>{item.depart}</td>
        <td>{item.destination}</td>
        <td>{item.typebus}</td>
        <td>
       
          <button type="button" class="btn btn-primary">
            Réserver
          </button>
        </td>
      </tr>
    ))}
  </tbody>
  
</table>


    </>
    
  );

};


export default Voyage;
