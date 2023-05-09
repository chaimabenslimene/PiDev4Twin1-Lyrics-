
import { useState } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// reactstrap components
import {
  Card,
  CardHeader,

  Container,
  Row,

  UncontrolledTooltip
} from "reactstrap";
// core components

import Header from "components/Headers/Header.js";
import axios from 'axios';
import React, { useEffect } from 'react';
import '../examples/Style.css';






const Icons = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 2;
  const LastIndex = currentPage * recordsPerPage;
  const firstIndex = LastIndex - recordsPerPage;
  const npage = 0;
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [query, setQuery] = useState('');
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

  async function handleSubmit(event) {
    event.preventDefault(); // empêche le formulaire de se soumettre de manière synchrone

    const form = event.target;
    const datedepart = form.elements.datedepart.value;
    const nbrplace = form.elements.nbrplace.value;
    const prixticket = form.elements.prixticket.value;
    const depart = form.elements.depart.value;
    const destination = form.elements.destination.value;
    const typebus = form.elements.typebus.value;
    try {
      const response = await axios.post('http://localhost:5000/api/Voyage/', {
        datedepart,
        nbrplace,
        prixticket,
        depart,
        destination,
        typebus
      });
      const newTicket = response.data;
      setData([...data, newTicket]); // met à jour les données dans le composant React
      togglePopup(); // masque le formulaire après l'ajout réussi
      toast.success('Added successfully !', {
        position: 'top-right',
        autoClose: 3000, // 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function handleUpdate(event) {
    event.preventDefault();

    const form = event.target;
    const id = form.elements.id.value;
    const datedepart = form.elements.datedepart.value;
    const nbrplace = form.elements.nbrplace.value;
    const prixticket = form.elements.prixticket.value;
    const depart = form.elements.depart.value;
    const destination = form.elements.destination.value;
    const typebus = form.elements.typebus.value;
    try {
      const response = await axios.put(
        'http://localhost:5000/api/Voyage/',
        {
          id, datedepart,
          nbrplace,
          prixticket,
          depart,
          destination,
          typebus
        }
      );
      const updatedUser = response.data;
      setData((prevData) =>
        prevData.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
      setEditUser(null);
      toast.success('updated successfully !', {
        position: 'top-right',
        autoClose: 3000, // 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteTicket(id) {
    try {
      const response = await axios.delete(`http://localhost:5000/api/Voyage/${id}`);
      console.log(response.data); // afficher la réponse de la suppression dans la console
      setData(data.filter((item) => item.id !== id)); // supprimer l'utilisateur de la liste des utilisateurs
      window.alert('supprimer avec succès');
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
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Tickets</h3>
              </CardHeader>
              <td style={{ textAlign: 'right' }}>
                <h5 style={{ display: 'inline-block' }}>
                
                </h5>
                <button className="add-btn" onClick={togglePopup}>
                  <i className="fas fa-plus"></i>
                </button>
              </td>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">datedepart</th>
                    <th scope="col">nbrplace</th>

                    <th scope="col">prixticket</th>
                    <th scope="col">depart</th>
                    <th scope="col">destination</th>
                    <th scope="col">typebus</th>
                  </tr>
                </thead>
                <tbody>

                  {data.filter((item) =>
                  item.depart.toLowerCase().includes(query)||
                  item.destination.toLowerCase().includes(query)
                          )
                  .map((item) => (
                    <tr key={item._id}>
                      <td>{item.datedepart}</td>
                      <td>{item.nbrplace}</td>
                      <td>{item.prixticket}</td>
                      <td>{item.depart}</td>
                      <td>{item.destination}</td>
                      <td>{item.typebus}</td>
                     
                      <td>
                        <button
                          className="edit-btn"
                          class="btn btn-warning"
                          onClick={() => setEditUser(item)}
                        >
                           <i class='fas fa-pencil-alt'></i>
                        </button>


                      </td>
                      <td>
                        <button className="delete-btn" onClick={() => deleteTicket(item._id)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                   
                    </tr>


                  ))}

                  {showPopup ? (
                    <div className="popup">
                      <h2>Ajouter User</h2>
                      <form onSubmit={handleSubmit}>
                        <label>
                          datedepart :
                          <input type="text" name="datedepart" required />

                        </label>
                        <label>
                          nbrplace :
                          <input type="nbrplace" name="nbrplace" required />
                        </label>
                        <label>
                          prixticket :
                          <input type="prixticket" name="prixticket" required />
                        </label>
                        <label>
                          depart :
                          <input type="depart" name="depart" required />
                        </label>
                        <label>
                          destination :
                          <input type="destination" name="destination" required />
                         
                        </label>
                        <label>
                          typebus :
                          <input type="typebus" name="typebus" required />
                        </label>

                        <button type="submit">Ajouter</button>
                      </form>
                      <button className="close-btn" onClick={togglePopup}>Fermer</button>
                    </div>
                  ) : null}
                  {editUser && (
                    <div className="popup">
                      <h2 >Modifier l'utilisateur

                      </h2>
                      <form onSubmit={handleUpdate}>
                        <input type="hidden" name="id" value={editUser._id} />


                        <label>
                          datedepart :
                          <input
                            type="text"
                            name="datedepart"
                            defaultValue={editUser.datedepart}
                            required
                          />
                        </label>


                        <label>
                          nbrplace :
                          <input
                            type="text"
                            name="nbrplace"
                            defaultValue={editUser.nbrplace}
                            required
                          />
                        </label>

                        <label>
                          prixticket :
                          <input
                            type="text"
                            name="prixticket"
                            defaultValue={editUser.prixticket}
                            required
                          />
                        </label>

                        <label>
                          typebus :
                          <input
                            type="text"
                            name="typebus"
                            defaultValue={editUser.typebus}
                            required
                          />
                        </label>

                        <label>
                          depart :
                          <input
                            type="text"
                            name="depart"
                            defaultValue={editUser.depart}
                            required
                          />
                        </label>
                        <label>
                          destination :
                          <input
                            type="text"
                            name="destination"
                            defaultValue={editUser.destination}
                            required
                          />
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

              <ul className='pagination'>
                <li className='page-item'>
                  <a href='#' className='page-link'
                    onClick={prePage}> Prev</a>

                </li>
                {
                  numbers.map((n, i) => (
                    <li className={`page-item ${currentPage === n ? `active` : ''}`} key={i}>
                      <a href='#' className='page-link'
                        onClick={() => changeCPage(n)}> {n}</a>
                    </li>


                  ))
                }
                <li className='page-item'>
                  <a href='#' className='page-link'
                    onClick={nextPage}>Next</a>
                </li>




              </ul>



            </Card>
          </div>
        </Row>
      </Container>

    </>

  );
  function prePage() {
    if (currentPage !== firstIndex) {

    } setCurrentPage(currentPage - 1)

  }
  function changeCPage(id) {
    setCurrentPage(id)

  }
  function nextPage() {
    if (currentPage !== LastIndex) {

    } setCurrentPage(currentPage + 1)

  }
};

export default Icons;
