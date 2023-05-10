const mongoose = require('mongoose');

const VoyageSchema = new mongoose.Schema(
  {
 
    datedepart: {
      type: Date,
      required: true,
    },
    nbrplace:{
        type:Number
    },

    prixticket: {
      type: Number,
  
    },
    depart: {
      type: String,
     
    },
    destination: {
        type: String,
       
      },
      typebus: {
        type: String,
       
      },
    }
)
module.exports = mongoose.model('Voyage', VoyageSchema);
