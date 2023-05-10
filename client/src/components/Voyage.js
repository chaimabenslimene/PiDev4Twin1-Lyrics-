import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// core components
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import CartTickett from '../components/CartTickett';





const Voyage = ({reservedVoyages,setReservedVoyages }) => {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editUser, setEditUser] = useState(null);
  

      const [cartItems, setCartItems] = useState([]);
      const [selectedVoyage, setSelectedVoyage] = useState(null);

    
      const handleReserveClick = (voyage) => {
        const reservedVoyage = reservedVoyages.find((v) => v._id === voyage._id);
      
        if (reservedVoyage) {
          // Voyage déjà réservé
          const updatedReservedVoyages = reservedVoyages.map((v) => {
            if (v._id === voyage._id) {
              v.quantity += 1;
            }
            console.log(v);
            return v;
            
          });
          console.log(updatedReservedVoyages);
          setReservedVoyages(updatedReservedVoyages);
      
          const updatedCartItems = cartItems.map((item) => {
            if (item._id === voyage._id) {
              item.quantity += 1;
            }
            console.log(item);
            return item;
          
          });
   
          setCartItems(updatedCartItems);
        } else {
          // Nouveau voyage réservé
          const newReservedVoyage = { ...voyage, quantity: 1 };
          setReservedVoyages([...reservedVoyages, newReservedVoyage]);
          const updatedCartItems = [...cartItems, newReservedVoyage];
          console.log(updatedCartItems);
          setCartItems(updatedCartItems);
          // Ajouter l'alerte
          toast.success('Le voyage est ajouté dans le panier avec succès!', {
            position: 'top-right',
            autoClose: 3000, // 3 seconds
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      };
      
      
      
      
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
     <ToastContainer />
     <br/>
  
     <br/>
    
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {data.map((item) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={item._id}
              xs={12}
              sm={item.typebus === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={item.depart}
                  subheader={item.destination}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
               
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h4" variant="h5" color="text.primary">
                      {item.prixticket}dt <br />
                    </Typography>

                    <Typography variant="h6" color="blue">
                      /person
                    </Typography>

                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h4" variant="h5" color="text.primary">
                      class {item.typebus}<br />
                    </Typography>

                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                  <center>
                    <Typography  color="text.secondary">
                      Date départ  : {item.datedepart}
                    </Typography>
                    </center>

                  </Box>

                </CardContent>
                <CardActions>
                <Button variant="contained" fullWidth onClick={() => handleReserveClick(item)} >
                        RESERVER
                      </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <br />
      <br/>
    </>
  );
};

export default Voyage;