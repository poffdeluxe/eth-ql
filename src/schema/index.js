const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
  type Block {
    id: ID!

    number: Int!

    hash: String!
    parentHash: String

    miner: String
    size: Int
    difficulty: String
    timestamp: Int

    transactions: [Transaction]
  }

  type Transaction {
    id: ID!

    hash: String!

    blockHash: String!
    block: Block!

    from: String
    to: String
    value: String

    gasPrice: String
    gas: Int

    input: String
  }

  type Query {
    block(id: ID!): Block
    latestBlock: Block

    transaction(id: ID!): Transaction
  }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});
