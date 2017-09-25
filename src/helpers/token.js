const abi = require('human-standard-token-abi');

const symbolToAddress = require('./known_tokens.json');

function getTokenAddressFromSymbol(symbol) {
  return symbolToAddress[symbol];
}

function getTokenContract(web3, address) {
  const contract = new web3.eth.Contract(abi, address);
  return contract;
}

function getTokenContractFromSymbol(web3, symbol) {
  if(!symbolToAddress[symbol]) throw new Error('Token not found or supported');

  const address = symbolToAddress[symbol];

  return getTokenContract(web3, address);
}

function getTokenName(web3, address) {
  const tokenContract = getTokenContract(web3, address);

  return tokenContract.methods.name().call();
}

function getTokenSupply(web3, address) {
  const tokenContract = getTokenContract(web3, address);

  return tokenContract.methods.totalSupply().call();
}

function getTokenBalance(web3, address, targetAddress) {
  const tokenContract = getTokenContract(web3, address);

  return tokenContract.methods.balanceOf(targetAddress).call();
}

module.exports = {
  getTokenAddressFromSymbol,
  getTokenName,
  getTokenSupply,
  getTokenBalance
};
