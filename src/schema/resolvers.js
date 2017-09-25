const {
  getTokenAddressFromSymbol,
  getTokenName,
  getTokenSupply,
  getTokenBalance
} = require('../helpers/token');

module.exports = {
  Query: {
    block: async (root, {id}, {web3}) => {
      return await web3.eth.getBlock(id);
    },

    latestBlock: async (root, args, {web3}) => {
      return await web3.eth.getBlock('latest');
    },

    transaction: async (root, {id}, {web3}) => {
      return await web3.eth.getTransaction(id);
    },

    address: (root, {id}, {web3}) => {
      return { id };
    },

    token: (root, {symbol}, {web3}) => {
      return {
        id: getTokenAddressFromSymbol(symbol),
        symbol
      };
    },

    tokenAt: (root, {address}, {web3}) => {
      return {
        id: address
      };
    }
  },

  Block: {
    id: b => b.hash,

    transactions: ({transactions: txIds}, data, {web3}) => {
        return Promise.all(txIds.map((txId) => {
          return web3.eth.getTransaction(txId);
        }));
    },
  },

  Transaction: {
    id: t => t.hash,

    block: async ({blockHash}, data, {web3}) => {
      return await web3.eth.getBlock(blockHash);
    },

    value: (t, {unit}, {web3}) => {
      return unit === 'WEI' ? t.value : web3.utils.fromWei(t.value, unit.toLowerCase());
    },

    toAddress: t => ({ id: t.to }),
    fromAddress: t => ({ id: t.from })
  },

  Address: {
    balance: async ({id}, {unit}, {web3}) => {
      const bal = await web3.eth.getBalance(id);
      return unit === 'WEI' ? bal : web3.utils.fromWei(bal, unit.toLowerCase());
    },

    code: async ({id}, data, {web3}) => {
      return await web3.eth.getCode(id)
    }
  },

  Token: {
    address: ({id}, data, {web3}) => {
      return { id };
    },

    name: async ({id}, data, {web3}) => {
      return await getTokenName(web3, id);
    },

    supply: async ({id}, data, {web3}) => {
      return await getTokenSupply(web3, id);
    },

    balanceOf: async ({id}, {address, unit}, {web3}) => {
      const bal = getTokenBalance(web3, id, address);

      return unit === 'WEI' ? bal : web3.utils.fromWei(bal, unit.toLowerCase());
    },
  }
};
