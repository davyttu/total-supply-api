const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Récupérer la clé API depuis les variables d'environnement
const apiKey = process.env.BASESCAN_API_KEY;

// Une route simple qui appelle l'API BaseScan
app.get('/total-supply', (req, res) => {
  axios.get('https://api.basescan.org/api', {
    params: {
      module: 'account',
      action: 'balance',
      address: '0x438f3e402Cd1eEe3d2Fb4Fb79f7900e8DAFCbFdf', // Remplace par une adresse réelle 
      apikey: apiKey
    }
  })
  .then(response => {
    res.json(response.data);
  })
  .catch(error => {
    res.status(500).send('Error fetching data: ' + error.message);
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
