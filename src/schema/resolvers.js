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
    }
  }
};
