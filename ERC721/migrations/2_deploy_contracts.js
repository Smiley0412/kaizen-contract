var ERC721 = artifacts.require("../contracts/ERC721.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC721);
};
