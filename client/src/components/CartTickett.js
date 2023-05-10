import React, { useState ,useEffect ,useContext} from 'react';
import Styles from './styles.module.css';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from 'reactstrap';
import Modal from 'react-modal';
import jsPDF from 'jspdf';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Payment from './Payment';
Modal.setAppElement('#root'); 



const calculateTotalPrice = (cartItems) => {
  if (!cartItems || cartItems.length === 0) {
    return 0;
  }
  return cartItems.reduce((total, item) => {
    return total + item.prixticket * item.quantity;
  }, 0);
};

const CartTickett = ({ reservedVoyages   }) => {
  console.log(reservedVoyages)
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    // Initialize the quantity to 1 for each reserved item
    const updatedReservedVoyages = reservedVoyages.map((item) => ({ ...item, quantity: 1 }));
    setCartItems(updatedReservedVoyages);
  }, [reservedVoyages]);


  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleDecreaseQuantity = (item) => {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex((cartItem) => cartItem._id === item._id);
    if (existingItemIndex !== -1) {
      if (updatedCartItems[existingItemIndex].quantity > 1) {
        updatedCartItems[existingItemIndex].quantity--;
        setCartItems(updatedCartItems);
      }
    }
  };
  useEffect(() => {
    // Cette fonction sera appelée à chaque fois que cartItems est mis à jour
    console.log('Cart items have been updated:', cartItems);
    // Appeler une fonction pour mettre à jour les données sur le serveur ou effectuer une autre action.
  }, []);
  const handleIncreaseQuantity = (item) => {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex((cartItem) => cartItem._id === item._id);
    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
    }
  };

  const handleDeleteCartItem = (item) => {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex((cartItem) => cartItem._id === item._id);
    if (existingItemIndex !== -1) {
      updatedCartItems.splice(existingItemIndex, 1);
      setCartItems(updatedCartItems);
      toast.warn('Votre produit a été supprimé');
    }
  };

  // const calculateTotalPrice = (cartItems) => {
  //   return cartItems.reduce((total, item) => {
  //     return total + item.prixticket * item.quantity;
  //   }, 0);
  // };
 

  const handleConfirmOrder = async () => {
    if (!user) {
      toast.error('Veuillez vous connecter pour confirmer votre commande.');
      window.location.href = '/login'; // redirect to login if user is not logged in
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5000/api/cart/${user._id}/items`, {
        items: cartItems.map(item => ({
          ticketId: item._id,
          quantity: item.quantity
        }))
      });
      console.log(response.data);
      
    } catch (error) {
      console.error(error);
    }
  };


 

  const handleConfirmOrderAndModalToggle = async () => {
     handleConfirmOrder();
    handleModalToggle();
  };

 
  return (
    <>
    <ToastContainer />
    <br/>
    <section className="h-100 h-custom">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />

      <div className="container" style={{ backgroundColor: "white" }}>
        <h1 className="fw-bold mb-4">Shopping Cart</h1>

        <div className={Styles.voyage}></div>

        {cartItems.length === 0 ? (
       <div style={{ display: "flex", justifyContent: "center" }}>
       <p style={{ fontSize: "1.5rem", fontWeight: "normal", textAlign: "center", color: "blue" }}>
         Le panier est vide
       </p>
     </div>
     
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className={`${Styles["voyage-item"]} ${Styles.voyage}`}>
              <div style={{ fontWeight: "bold" }}>
                {item.depart} → {item.destination}
              </div>
              <div>Prix : {item.prixticket} dt/personne</div>
              <div>Classe : {item.typebus}</div>
              <div>Date de départ : {item.datedepart}</div>
              <button onClick={() => handleDecreaseQuantity(item)}>-</button>
              <div style={{ fontWeight: "bold" }}>Quantité : {item.quantity}</div>
              <button onClick={() => handleIncreaseQuantity(item)}>+</button>
              <i
                className="fas fa-trash-alt text-danger"
                onClick={() => handleDeleteCartItem(item)}
              ></i>
              
            </div>
            
          ))
        )}
<br/>
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
  {cartItems.length !== 0 && (
    <>
      <div style={{ fontWeight: "bold", marginBottom: "1rem" }}>
        Total : {calculateTotalPrice(cartItems)} dt
      </div>
      <Button color="primary" onClick={handleConfirmOrderAndModalToggle}>
        Confirmer la commande
      </Button>
    </>
  )}

</div>

      </div>
<br/>
<br/>
<br/>
<br/>

        <Modal isOpen={isModalOpen} onRequestClose={handleModalToggle}>
        <div style={{ padding: '20px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column' }}>
        <center>
  <h2 style={{ color: 'black' }}>Vos Voyages Commandés</h2>
</center>
<br/>
<br/>
  {cartItems.map((item) => (
    <div key={item._id} className={`${Styles['voyage-item']} ${Styles.voyage}`}>
      <div> votre schéma : {item.depart} → {item.destination}</div>
      <div>Prix : {item.prixticket} dt/personne</div>
      <div>Classe : {item.typebus}</div>
      <div>Date de départ : {item.datedepart}</div>
      <div>Nombre de Ticket Reservé pour ce schéma: {item.quantity}</div>
    </div>
  ))}
 <Button variant="contained" onClick={() => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width - 40;
  const pageHeight = doc.internal.pageSize.height - 40;

  // Add blue background color
  doc.setFillColor(176, 224, 230);
  doc.rect(20, 20, pageWidth, pageHeight, 'F');

  // Add logo image
  const logo = new Image();
  logo.src = './image/argon-react-white.png';
  logo.onload = function() {
    const logoWidth = 50; // set the width of the logo
    const logoHeight = (logoWidth * this.height) / this.width;
    doc.addImage(this, 'PNG', 30, 30, logoWidth, logoHeight); // set the position of the logo and use the new width and height
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    
    doc.text('Vos Voyages commandés', 30, logoHeight + 50, { align: 'center' }); // add text below the image
   
    // Add content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let y = logoHeight + 80; // adjust the y position for the content
    cartItems.forEach((item) => {
      doc.text(`votre schéma : ${item.depart} to ${item.destination}`, 30, y);
      doc.text(`Prix : ${item.prixticket} dt/personne`, 30, y+10);
      doc.text(`Classe : ${item.typebus}`, 30, y+20);
      doc.text(`Date de départ : ${item.datedepart}`, 30, y+30);
      doc.text(`Nombre de Ticket Reservé pour ce schéma: ${item.quantity}`, 30, y+40);
      y += 60;
    });

    // Add footer
    const date = new Date();
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // Add date and time
    doc.text(`Date de Facture : ${dateString} ${timeString}`, pageWidth - 20, pageHeight - 30, { align: 'right' });
    
    // Add "Merci pour votre confiance et bon voyage"
    doc.text('Merci pour votre confiance et bon voyage', pageWidth - 20, pageHeight - 20, { align: 'right' });
    
    doc.save('voyages_commandes.pdf');
   
  
    doc.save('voyages_commandes.pdf');
  };
}}>
  Télécharger en PDF
</Button>

<br/>
<Link to="/Payement" className="btn btn--primary" style={{ backgroundColor: 'gray', color: 'white', fontWeight: 'bold' }}>NEXT</Link>


  </div>
</Modal>

      </section>
      
    </>
   
  );
};
export {CartTickett,calculateTotalPrice } ;