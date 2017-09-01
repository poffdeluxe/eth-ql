module.exports = {
  Query: {
    block: async (root, {id}, {web3}) => {
      return await web3.eth.getBlock(id);
    },

    latestBlock: async (root, args, {web3}) => {
      return await web3.eth.getBlock('latest');
    }
  },

  Block: {
    id: root => root.hash
  }
};
