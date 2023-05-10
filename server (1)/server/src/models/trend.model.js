const mongoose = require('mongoose');


// Définir le schéma pour le livre
const trendSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }
});


module.exports = mongoose.model('Trend', trendSchema);
