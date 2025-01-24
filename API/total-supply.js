const Web3 = require('web3');
// Créer une instance Web3 avec l'URL de ton fournisseur (Infura, Alchemy, etc.)
const web3 = new Web3('https://base-mainnet.infura.io/v3/98eeedebb5c644399f17a9704b7519b5');

// Adresse de ton contrat
const contractAddress = '0x438f3e402Cd1eEe3d2Fb4Fb79f7900e8DAFCbFdf';

// L'ABI de ton contrat
const abi = [{
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}];

// Créer l'instance du contrat
const contract = new web3.eth.Contract(abi, contractAddress);

// Définir le gestionnaire pour le chemin '/total-supply'
module.exports = async (req, res) => {
  try {
    // Appeler la méthode totalSupply du contrat
    const totalSupplyWei = await contract.methods.totalSupply().call();

    // Convertir en nombre entier et ajuster le format
    const totalSupply = web3.utils.toBN(totalSupplyWei).div(web3.utils.toBN(10).pow(web3.utils.toBN(18))).toString();

    // Renvoyer seulement la valeur numérique sans "totalSupply"
    res.status(200).send(totalSupply);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching total supply');
  }
};