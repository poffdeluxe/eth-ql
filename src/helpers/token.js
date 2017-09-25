const abi = require('human-standard-token-abi');

const symbolToAddress = {
  'ANT': '0x960b236A07cf122663c4303350609A66A7B288C0'
};

const addressToContract = {};

function getTokenAddressFromSymbol(symbol) {
  return symbolToAddress[symbol];
}

function getTokenContract(web3, address) {
  const contract = new web3.eth.contract(abi, address);

  addressToContract[address] = contract;

  return contract;
}

function getTokenContractFromSymbol(web3, symbol) {
  if(!symbolToAddress[symbol]) throw new Error('Token not found or supported');

  const address = symbolToAddress[symbol];

  // If we've already loaded for this contract just re-use
  if(addressToContract[address]) return contract;

  return getTokenContract(web3, address)
}

function getTokenName(web3, address) {
  const tokenContract = getTokenContract(web3, address)

  return tokenContract.name.call()
    .then((name) => {
      return name;
    })
    .reject(() => {
      return null;
    });
}

function getTokenSupply(web3, address) {
  const tokenContract = getTokenContract(web3, address)

  return tokenContract.totalSupply.call()
    .then((supply) => {
      return supply;
    });
}

function getTokenBalance(web3, address, targetAddress) {
  const tokenContract = getTokenContract(web3, address)

  return tokenContract.balanceOf.call(targetAddress)
    .then((balance) => {
      return balance;
    });
}

module.exports = {
  getTokenAddressFromSymbol,
  getTokenName,
  getTokenSupply,
  getTokenBalance
};
