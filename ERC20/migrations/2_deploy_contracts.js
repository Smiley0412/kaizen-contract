var ERC20 = artifacts.require("../contracts/ERC20.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC20);
};
