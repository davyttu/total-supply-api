const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('https://base-mainnet.infura.io/v3/98eeedebb5c644399f17a9704b7519b5'));

const contractAddress = '0x438f3e402Cd1eEe3d2Fb4Fb79f7900e8DAFCbFdf';

const abi = [
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const contract = new web3.eth.Contract(abi, contractAddress);

async function getTotalSupply() {
  try {
    const totalSupplyWei = await contract.methods.totalSupply().call();
    return web3.utils
      .toBN(totalSupplyWei)
      .div(web3.utils.toBN(10).pow(web3.utils.toBN(18)))
      .toString();
  } catch (error) {
    console.error("Erreur lors du calcul de la Total Supply:", error);
    return null;
  }
}

// Fonction serverless compatible avec Vercel
module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send("Méthode non autorisée, utilisez GET.");
  }

  if (req.query.q === "totalcoins") {
    const totalSupply = await getTotalSupply();
    if (totalSupply) {
      res.status(200).send(totalSupply);
    } else {
      res.status(500).send("Erreur serveur");
    }
  } else {
    res.status(400).send("Paramètre invalide. Utilisez ?q=totalcoins.");
  }
};
