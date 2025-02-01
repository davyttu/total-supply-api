// Charger les variables d'environnement
require('dotenv').config();
console.log("INFURA_URL:", process.env.INFURA_URL);
console.log("CONTRACT_ADDRESS:", process.env.CONTRACT_ADDRESS);

// Importer les modules nécessaires
const express = require('express');
const { Web3 } = require('web3'); // Nouvelle syntaxe pour Web3 4.x

// Initialiser Express
const app = express();

// Initialiser Web3 avec le fournisseur Infura
const web3 = new Web3(process.env.INFURA_URL);

// Adresse du contrat intelligent
const contractAddress = process.env.CONTRACT_ADDRESS;

// ABI du contrat (simplifié pour la fonction totalSupply)
const abi = [
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

// Créer une instance du contrat
const contract = new web3.eth.Contract(abi, contractAddress);

// Fonction pour récupérer la totalSupply
async function getTotalSupply() {
  try {
    // Appeler la fonction totalSupply du contrat
    const totalSupplyWei = await contract.methods.totalSupply().call();

    // Convertir la valeur de wei à une forme lisible (en supposant 18 décimales)
    const totalSupply = web3.utils.fromWei(totalSupplyWei, 'ether');
    return totalSupply;
  } catch (error) {
    console.error("Erreur lors de la récupération de la Total Supply:", error);
    throw new Error("Impossible de récupérer la Total Supply.");
  }
}

// Route principale
app.get('/', (req, res) => {
  res.send("L'API fonctionne. Utilisez /api.dws?q=totalcoins pour obtenir la Total Supply.");
});

// Route pour récupérer la totalSupply
app.get('/api.dws', async (req, res) => {
  try {
    // Vérifier si le paramètre 'q' est égal à 'totalcoins'
    if (req.query.q === "totalcoins") {
      const totalSupply = await getTotalSupply();
      res.send(totalSupply); // Renvoyer la totalSupply
    } else {
      res.status(400).send("Paramètre invalide. Utilisez ?q=totalcoins.");
    }
  } catch (error) {
    console.error("Erreur serveur:", error);
    res.status(500).send(`Erreur serveur : ${error.message}`);
  }
});

// Définir le port d'écoute
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});