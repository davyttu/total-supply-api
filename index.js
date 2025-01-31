const express = require('express');
const { Web3 } = require('web3'); // Utilisation de la syntaxe ES6 pour importer Web3

const app = express();

// Configuration de Web3 avec Infura
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

// Initialisation du contrat
const contract = new web3.eth.Contract(abi, contractAddress);

// Fonction pour récupérer la valeur `totalSupply`
async function getTotalSupply() {
  try {
    console.log("Appel de la fonction totalSupply() sur le contrat...");
    const totalSupplyWei = await contract.methods.totalSupply().call();
    console.log("totalSupplyWei:", totalSupplyWei);
    const totalSupply = web3.utils
      .toBN(totalSupplyWei)
      .div(web3.utils.toBN(10).pow(web3.utils.toBN(18))) // Diviser par 10^18
      .toString(); // Convertir en chaîne de caractères
    console.log("totalSupply:", totalSupply);
    return totalSupply;
  } catch (error) {
    console.error("Erreur dans getTotalSupply:", error);
    throw error; // Propager l'erreur pour la gérer dans la route
  }
}

// Route pour vérifier si l'API fonctionne
app.get('/', (req, res) => {
  res.send("L'API fonctionne. Utilisez /api.dws?q=totalcoins pour obtenir la Total Supply.");
});

// Route pour récupérer la Total Supply
app.get('/api.dws', async (req, res) => {
  try {
    console.log("Requête reçue :", req.query);
    // Vérifier si le paramètre "q" est égal à "totalcoins"
    if (req.query.q === "totalcoins") {
      const totalSupply = await getTotalSupply();
      // Retourne uniquement la valeur de la Total Supply
      res.send(totalSupply);
    } else {
      // Si le paramètre "q" n'est pas "totalcoins", retourner une erreur
      res.status(400).send("Paramètre invalide. Utilisez ?q=totalcoins.");
    }
  } catch (error) {
    console.error("Erreur dans la route /api.dws:", error);
    res.status(500).send("Erreur serveur");
  }
});

// Lancer le serveur sur le port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});