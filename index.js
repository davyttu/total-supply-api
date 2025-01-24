const express = require('express');
const Web3 = require('web3');

const app = express();
const web3 = new Web3('https://base-mainnet.infura.io/v3/98eeedebb5c644399f17a9704b7519b5');

// Adresse de votre contrat
const contractAddress = '0x438f3e402Cd1eEe3d2Fb4Fb79f7900e8DAFCbFdf';

// ABI (Application Binary Interface) de votre contrat
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

const contract = new web3.eth.Contract(abi, contractAddress);

// Route racine pour vérifier que le serveur est actif
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API Total Supply');
});

// Endpoint pour récupérer la valeur totale
app.get('/total-supply', async (req, res) => {
  try {
    // Récupération de la valeur `totalSupply` en wei
    const totalSupplyWei = await contract.methods.totalSupply().call();

    // Conversion de wei à un nombre sans décimales (diviser par 10^18)
    const totalSupply = web3.utils
      .toBN(totalSupplyWei)
      .div(web3.utils.toBN(10).pow(web3.utils.toBN(18))) // Diviser par 10^18
      .toString(); // Convertir en chaîne de caractères

    // Renvoi de la valeur brute comme réponse
    res.send(totalSupply);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching total supply');
  }
});

// Lancer le serveur sur le port 3000
app.listen(3000, () => {
  console.log("Serveur en cours d'exécution sur http://localhost:3000");
});
