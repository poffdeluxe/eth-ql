const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
  type Block {
    id: ID!

    number: Int
    hash: String
    parentHash: String
    miner: String,
    size: Int,
    difficulty: String,
    timestamp: Int
  }

  type Query {
    block(id: ID!): Block,
    latestBlock: Block
  }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});
