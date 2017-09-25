const fs = require('fs');
const abi = require('human-standard-token-abi');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://ethereum:8545"));

const setupAccounts = async () => {
  const accounts = await web3.eth.getAccounts();

  let from = accounts[0];
  let to = accounts[1];

  const sendARound = () => {
    const tx = {
      from,
      to,
      value: 1
    };

    console.log(`Sending ETH from ${from} to ${to}`)
    web3.eth.sendTransaction(tx);
  }

  sendARound();

  setInterval(() => {
    [from, to] = [to, from];

    sendARound();
  }, 3000);

}

const setupToken = async () => {
  const accounts = await web3.eth.getAccounts();

  const bytecode = fs.readFileSync('token.bytecode');
  const contract = new web3.eth.Contract(abi, {
      data: '0x' + bytecode,
  });
  console.log("Deploying contract")

  await contract.deploy({ arguments: [1000, 'Test Token', 10, 'TOK'] })
    .estimateGas({gas: 9000000000})
    .then(function(gasAmount){
      console.log(gasAmount)
    })
    .catch(function(error){
      console.log(error);
    });
    // .send({
    //   from: accounts[0],
    //   gas: '5003200'
    // })
    // .on('error', function(error){
    //   console.log(error);
    // })
    // .on('transactionHash', function(transactionHash){
    //   console.log(transactionHash)
    // })
    // .on('receipt', function(receipt){
    //   console.log(receipt.contractAddress) // contains the new contract address
    // })
    // .then(function(newContractInstance){
    //     console.log(newContractInstance.options.address) // instance with the new contract address
    // });
};

//setupAccounts();
setupToken();
