const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
  enum CurUnit {
    WEI
    FINNEY
    ETHER
  }

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
    fromAddress: Address

    to: String
    toAddress: Address

    value(unit: CurUnit = WEI): String

    gasPrice: String
    gas: String

    input: String
  }

  type Address {
    id: ID!

    balance(unit: CurUnit = WEI): String
    code: String
  }

  type Token {
    id: ID!
    address: Address

    symbol: String
    name: String
    supply: Int

    balance(address: String!, unit: CurUnit = WEI): String
  }

  type Query {
    block(id: ID!): Block
    latestBlock: Block

    transaction(id: ID!): Transaction

    address(id: ID!): Address

    token(symbol: String): Token
    tokenAt(address: String): Token
  }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});
