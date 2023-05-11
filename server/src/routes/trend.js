const express = require('express');
const Trend = require('../models/trend.model');

const router = express.Router();

// Analyser les requêtes POST JSON
router.use(express.json());

// Route pour ajouter le trend
router.post('/', (req, res) => {
  const { title, content, image } = req.body;

  // Créer un nouveau trend à partir des données envoyées par le client
  const newTrend = new Trend({ title, content, image });

  // Ajouter le trend à la base de données
  newTrend.save()
    .then(() => res.status(201).send('Trend ajouté avec succès'))
    .catch(err => {
      console.error('Erreur lors de l\'ajout du trend:', err);
      res.status(500).send('Une erreur est survenue lors de l\'ajout du trend');
    });
});

// Route pour mettre à jour un trend existant
router.put('/:id', (req, res) => {
    const { title, content, image } = req.body;
    const _id = req.params.id;
  
    Trend.findByIdAndUpdate(_id, { title, content, image }, { new: true, runValidators: true })
      .then(updatedTrend => {
        if (!updatedTrend) {
          return res.status(404).send('Trend non trouvé');
        }
        res.status(200).send('Trend mis à jour avec succès');
      })
      .catch(err => {
        console.error('Erreur lors de la mise à jour du Trend:', err);
        res.status(500).send('Une erreur est survenue lors de la mise à jour du Trend');
      });
  });

  router.delete('/:id', (req, res) => {
    const _id = req.params.id;
  
    Trend.findByIdAndDelete(_id)
      .then(deletedTrend => {
        if (!deletedTrend) {
          return res.status(404).send('Trend non trouvé');
        }
        res.status(200).send('Trend supprimé avec succès');
      })
      .catch(err => {
        console.error('Erreur lors de la suppression du Trend:', err);
        res.status(500).send('Une erreur est survenue lors de la suppression du Trend');
      });
  });

  router.get('/:id', (req, res) => {
    const _id = req.params.id;
  
    Trend.findOne({ _id })
      .then(trend => {
        if (!trend) {
          return res.status(404).send('Trend non trouvé');
        }
        res.status(200).json(trend);
      })
      .catch(err => {
        console.error('Erreur lors de la récupération du Trend:', err);
        res.status(500).send('Une erreur est survenue lors de la récupération du Trend');
      });
  });

  router.get('/', (req, res) => {
    Trend.find()
      .then(trends => {
        res.status(200).json(trends);
      })
      .catch(err => {
        console.error('Erreur lors de la récupération des trends:', err);
        res.status(500).send('Une erreur est survenue lors de la récupération des trends');
      });
  });
  
  
  

// Exporter le routeur
module.exports = router;