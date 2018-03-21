var EthereumDice = artifacts.require("./EthereumDice.sol");

module.exports = function(deployer) {
  deployer.deploy(EthereumDice);
};
