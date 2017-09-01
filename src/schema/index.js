const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
  type Block {
    id: ID!

    number: Int
    hash: String
    parentHash: String
  }

  type Query {
    block(id: ID!): Block
  }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});
