const express = require('express');
const Web3 = require('web3');
const app = express();
const web3 = new Web3('https://base-mainnet.infura.io/v3/98eeedebb5c644399f17a9704b7519b5');
const contractAddress = '0x438f3e402Cd1eEe3d2Fb4Fb79f7900e8DAFCbFdf'; // Remplace par l'adresse de ton contrat
const abi = [{
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
}]; // ABI du contrat correctement fermée

const contract = new web3.eth.Contract(abi, contractAddress);

app.get('/total-supply', async (req, res) => {
  try {
    // Récupérer la valeur de totalSupply en wei
    const totalSupplyWei = await contract.methods.totalSupply().call();
    
    // Convertir en nombre entier et ajuster pour supprimer les décimales (diviser par 10^18)
    const totalSupply = web3.utils.toBN(totalSupplyWei)
                                .div(web3.utils.toBN(10).pow(web3.utils.toBN(18))) // Diviser par 10^18
                                .toString(); // Convertir en chaîne de caractères

    // Renvoi directement la valeur sans clé ni objet
    res.send(totalSupply);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching total supply');
  }
});

app.listen(3000, () => {
  console.log('Serveur en cours d\'exécution sur http://localhost:3000');
});
