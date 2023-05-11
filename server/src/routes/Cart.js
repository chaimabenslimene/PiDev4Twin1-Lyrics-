
const express = require('express');
const Cart = require('../models/cart.model');
const Voyage =require('../models/voyage');
const router = express.Router();
const User =require('../models/users.model');

router.get('/carts', async (req, res) => {
  try {
    const carts = await Cart.find();
    const cartsWithUserNames = await Promise.all(
      carts.map(async cart => {
        const user = await User.findById(cart.userId);
        const voyages = await Voyage.find({ _id: { $in: cart.items.map(item => item.ticketId) } });
        const itemsWithVoyageDetails = await Promise.all(
          cart.items.map(async item => {
            const voyage = await Voyage.findById(item.ticketId);

            return {
              ...item.toObject(),
              voyage: voyage.toObject()
            }
          })
        )
        const datedeparts = voyages.map(voyage => voyage.datedepart);
        return {
          userId: cart.userId,
          voyageId: cart.VoyageId,
          items: itemsWithVoyageDetails,
          userName: user ? user.firstname + ' ' + user.lastname : 'unknown',
          datedepart: datedeparts,
        };
      })
    );
    res.json(cartsWithUserNames);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/lamis/:userId', async (req, res) => {
  try {
    const {userId} = req.params;
    const carts = await Cart.find({ userId: userId });
    const cartsWithUserNames = await Promise.all(
      carts.map(async cart => {
        const user = await User.findById(cart.userId);
        const voyages = await Voyage.find({ _id: { $in: cart.items.map(item => item.ticketId) } });
        const itemsWithVoyageDetails = await Promise.all(
          cart.items.map(async item => {
            const voyage = await Voyage.findById(item.ticketId);

            return {
              ...item.toObject(),
              voyage: voyage.toObject()
            }
          })
        )
        const datedeparts = voyages.map(voyage => voyage.datedepart);
        return {
          userId: cart.userId,
          voyageId: cart.VoyageId,
          items: itemsWithVoyageDetails,
          userName: user ? user.firstname + ' ' + user.lastname : 'unknown',
          datedepart: datedeparts,
        };
      })
    );
    res.json(cartsWithUserNames);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});











// router.post('/:userId/items', async (req, res) => {
//     const { userId } = req.params;
//     const { ticketId, quantity } = req.body;
  
//     const cart = await Cart.findOne({ userId });
  
//     if (!cart) {
//       // Si le panier de l'utilisateur n'existe pas encore, on le crée
//       const newCart = new Cart({ userId, items: [{ ticketId, quantity }] });
//       await newCart.save();
//     } else {
//       // Si le panier de l'utilisateur existe déjà, on ajoute le produit au panier
//       const existingItemIndex = cart.items.findIndex(item => item.ticketId && item.ticketId.equals(ticketId));

  
//       if (existingItemIndex !== -1) {
//         // Si le produit existe déjà dans le panier, on met à jour la quantité
//         cart.items[existingItemIndex].quantity += quantity;
//       } else {
//         // Si le produit n'existe pas encore dans le panier, on l'ajoute au panier
//         cart.items.push({ ticketId, quantity });
//       }
//       await cart.save();
//     }
//     res.json({ success: true });
//   });

router.post('/:userId/items', async (req, res) => {
  const { userId } = req.params;
  const { items } = req.body;

  try {
    // Rechercher le panier de l'utilisateur dans la base de données
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Si le panier n'existe pas, créer un nouveau panier pour l'utilisateur
      cart = new Cart({ userId, items });
      await cart.save();
    } else {
      // Si le panier existe déjà, ajouter les nouveaux articles au panier existant
      items.forEach(item => {
        const existingItemIndex = cart.items.findIndex(cartItem => cartItem.ticketId === item.ticketId);

        if (existingItemIndex !== -1) {
          cart.items[existingItemIndex].quantity += item.quantity;
        } else {
          cart.items.push(item);
        }
      });

      await cart.save();
    }

    res.status(200).json({ success: true, message: 'Commande confirmée avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erreur lors de la confirmation de la commande' });
  }
});
  router.post('/:userId/add-to-cart', async (req, res) => {
    const { userId } = req.params;
    const { ticketId } = req.body;
    
    const cart = await Cart.findOne({ userId });
    const voyage = await Voyage.findById(ticketId);
  
    if (!cart) {
      // Si le panier de shopping n'existe pas, créez-en un nouveau
      const newCart = new Cart({ userId });
      newCart.items.push({ ticketId, quantity: 1 });
      await newCart.save();
      res.json({ cart: newCart });
      return;
    }
  
    // Vérifiez si le voyage est déjà dans le panier de shopping
    const item = cart.items.find(item => item.ticketId.equals(ticketId));
    if (item) {
      // Si le voyage est déjà dans le panier de shopping, mettez à jour la quantité
      item.quantity += 1;
    } else {
      // Sinon, ajoutez un nouvel article dans le panier de shopping
      cart.items.push({ ticketId, quantity: 1 });
    }
  
    await cart.save();
    res.json({ cart });
  });



  router.delete('/:userId/items/:ticketId', async (req, res) => {
    const { userId, ticketId } = req.params;
  
    const cart = await Cart.findOne({ userId });
  
    if (!cart) {
      res.status(404).json({ error: 'Cart not found' });
      return;
    }
  
    const itemIndex = cart.items.findIndex(item => item.ticketId.equals(ticketId));
  
    if (itemIndex === -1) {
      res.status(404).json({ error: 'Item not found in cart' });
      return;
    }
  
    cart.items.splice(itemIndex, 1);
    await cart.save();
  
    res.json({ success: true });
  });
  //recupere les données
  router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
  
    const cart = await Cart.findOne({ userId }).populate('items.ticketId');
  
    if (!cart) {
      res.status(404).json({ error: 'Cart not found' });
      return;
    }
  
    res.json({ cart });
  });
  
 
  
  module.exports = router;