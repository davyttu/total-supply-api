const express = require('express');
const Web3 = require('web3');

const app = express();
const port = 3000; // Port local pour l'application

// Connexion au réseau Base (RPC officiel de Base)
const web3 = new Web3('https://mainnet.base.org');

// Adresse du contrat et ABI
const contractAddress = '0x438f3e402Cd1eEe3d2Fb4Fb79f7900e8DAFCbFdf'; // Adresse du contrat sur Base
const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

// Initialisation du contrat
const contract = new web3.eth.Contract(abi, contractAddress);

// Route API pour obtenir le totalSupply
app.get('/total-supply', async (req, res) => {
  try {
    const totalSupply = await contract.methods.totalSupply().call();
    res.json({ totalSupply });
  } catch (error) {
    console.error('Erreur lors de la récupération de totalSupply :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de totalSupply' });
  }
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
