
import {
  
  Card,
  CardHeader,
  Container,
  Row
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../examples/Style.css';

const Tables = () => {
const [data, setData] = useState([]);
const [showPopup, setShowPopup] = useState(false);
const [editUser, setEditUser] = useState(null);
const [query, setQuery] = useState("");

  async function fetchAllData() {
    try {
      const response = await axios.get('http://localhost:5000/api/users/'); //le chemin d'accès de votre API Express
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
 

  async function handleSubmit(event) {
    event.preventDefault(); // empêche le formulaire de se soumettre de manière synchrone

    const form = event.target;
    const username = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        username,
        email,
        password
      });
      const newUser = response.data;
      setData([...data, newUser]); // met à jour les données dans le composant React
      togglePopup(); // masque le formulaire après l'ajout réussi
      window.alert('ajouter avec succès');
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteUser(id) {
    try {
      const response = await axios.delete(`http://localhost:5000/api/users/${id}`);
      console.log(response.data); // afficher la réponse de la suppression dans la console
      setData(data.filter((item) => item.id !== id)); // supprimer l'utilisateur de la liste des utilisateurs
      window.alert('supprimer avec succès');
    } catch (error) {
      console.error(error);
    }
  }
  async function handleUpdate(event) {
    event.preventDefault();
  
    const form = event.target;
    const id = form.elements.id.value;
    const username = form.elements.username.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${id}`,
        { username, email, password }
      );
      const updatedUser = response.data;
      setData((prevData) =>
        prevData.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
      setEditUser(null);
      window.alert("Mise à jour réussie");
    } catch (error) {
      console.error(error);
    }
  }

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        
        {/* Table */}
        <Row>
          
          <div className="col">
            <Card className="shadow">
<div className="input-group mb-3">
  <input
    type="search"
    className="form-control"
    placeholder="Search"
    aria-label="Search"
    aria-describedby="button-addon2"
    onChange={(e) => setQuery(e.target.value.toLowerCase())}
  />
  <button
    className="btn btn-outline-secondary"
    type="button"
    id="button-addon2"
  >
    <i className="fas fa-search"></i>
  </button>
</div>

              <CardHeader className="border-0">
                <h3 className="mb-0">Card tables</h3>
              </CardHeader>
              <table class="table">
             
  <thead>
    <tr>
      <th scope="col">UserName</th>
      <th scope="col">Email</th>
      
      <th scope="col">createdAt</th>
      <th scope="col">updatedAt</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
    
    
    data.filter((item) =>
    item.username.toLowerCase().includes(query)||
    item.email.toLowerCase().includes(query)
            )
          
    
    
    
    .map((item) =>(
      <tr key={item._id}>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>{item.createdAt}</td>
      <td>{item.updatedAt}</td>
      <td>
      <button className="add-btn" onClick={togglePopup}>
        <i className="fas fa-plus"></i> 
      </button>
      </td>
      <td>
      <button className="delete-btn" onClick={() => deleteUser(item._id)}>
  <i className="fas fa-trash"></i> 
</button>
</td>
<td>
<button
  className="edit-btn"
  class="btn btn-warning"
  onClick={() => setEditUser(item)}
>
  <i class="bi bi-sticky"></i> Modifier
</button>

</td>
    </tr>

    ))}

  {showPopup ? (
        <div className="popup">
          <h2>Ajouter User</h2>
          <form  onSubmit={handleSubmit}>
            <label>
              UserName :
              <input type="text" name="name" required />
            </label>
            <label>
              Email :
              <input type="email" name="email" required />
            </label>
            <label>
              Password :
              <input type="password" name="password" required />
            </label>
            <button type="submit">Ajouter</button>
          </form>
          <button className="close-btn" onClick={togglePopup}>Fermer</button>
        </div>
      ) : null}
     {editUser && (
  <div className="popup">
    <h2>Modifier l'utilisateur {editUser.username}</h2>
    <form onSubmit={handleUpdate}>
      <input type="hidden" name="id" value={editUser._id} />
      <label>
        UserName :
        <input
          type="text"
          name="username"
          defaultValue={editUser.username}
          required
        />
      </label>
      <label>
        Email :
        <input
          type="email"
          name="email"
          defaultValue={editUser.email}
          required
        />
      </label>
      <label>
        Password :
        <input type="password" name="password" required />
      </label>
      <button type="submit">Mettre à jour</button>
    </form>
    <button className="close-btn" onClick={() => setEditUser(null)}>
      Fermer
    </button>
  </div>
)}

        </tbody>
</table>
             
            </Card>
          </div>
        </Row>
      
             
             
       
         
      </Container>
    </>
  );
};

export default Tables;
