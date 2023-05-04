const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    userId: String,
    items: [{
      ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voyage'
      },
      quantity: Number
    }]
  });
  
module.exports = mongoose.model('Cart', cartSchema);