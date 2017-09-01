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
    id: b => b.hash
  },

  Transaction: {
    id: t => t.hash
  }
};
