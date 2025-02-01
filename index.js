require('dotenv').config();
console.log("INFURA_URL:", process.env.INFURA_URL);
console.log("CONTRACT_ADDRESS:", process.env.CONTRACT_ADDRESS);

const express = require('express');
const Web3 = require('web3');

const app = express();

const web3 = new Web3(process.env.INFURA_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;

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

async function getTotalSupply() {
  try {
    const totalSupplyWei = await contract.methods.totalSupply().call();
    const totalSupply = web3.utils
      .toBN(totalSupplyWei)
      .div(web3.utils.toBN(10).pow(web3.utils.toBN(18)))
      .toString();
    return totalSupply;
  } catch (error) {
    console.error("Erreur lors de la récupération de la Total Supply:", error);
    throw new Error("Impossible de récupérer la Total Supply.");
  }
}

app.get('/', (req, res) => {
  res.send("L'API fonctionne. Utilisez /api.dws?q=totalcoins pour obtenir la Total Supply.");
});

app.get('/api.dws', async (req, res) => {
  try {
    if (req.query.q === "totalcoins") {
      const totalSupply = await getTotalSupply();
      res.send(totalSupply);
    } else {
      res.status(400).send("Paramètre invalide. Utilisez ?q=totalcoins.");
    }
  } catch (error) {
    console.error("Erreur serveur:", error);
    res.status(500).send(`Erreur serveur : ${error.message}`);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
