module.exports = {
  Query: {
    block: async (root, {id}, {web3}) => {
      const targetBlock = await web3.eth.getBlock(id);
      return targetBlock;
    }
  },

  Block: {
    id: root => root.hash
  }
};
