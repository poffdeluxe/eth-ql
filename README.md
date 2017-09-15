# eth-ql
GraphQL bindings to explore the ETH blockchain

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Try it out
GraphQL endpoint available at `https://eth-ql.herokuapp.com/graphql`

[Graphiql works too!](https://eth-ql.herokuapp.com/graphiql)

**Example query:**
```
query {
  latestBlock {
    hash,
    number,
    transactions {
      to,
      from,
      value
    }
  }
}
```

## Get Started
`docker-compose up`

After it goes up, the ETH `testrpc` will be running alongside the graphql API.
You can then access the GraphiQL UI at `http://localhost:3001/graphiql`

## About ETH Stuff
Using web3 for ETH blockchain inspection. [Docs here](https://web3js.readthedocs.io/).

Using [testrpc](https://github.com/ethereumjs/testrpc) for local testing.
