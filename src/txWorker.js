const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://ethereum:8545"));

const main = async () => {
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

main();
