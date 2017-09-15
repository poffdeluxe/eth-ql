const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const Web3 = require('web3');

const schema = require('./schema');

// Setup web3
// TODO: make HTTP provider url a env var
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER));

var app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({context: {web3}, schema}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

// TODO: port = env var too
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`ETH GraphQL server running on port ${PORT}.`);
});
