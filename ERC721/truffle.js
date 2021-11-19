const path = require('path');
const PrivateKeyProvider = require("truffle-privatekey-provider");

module.exports = {
  contracts_build_directory: path.resolve(__dirname + "/build"),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    deployment: {
      provider: new PrivateKeyProvider(process.env.privateKey, process.env.provider),
      network_id: process.env.networkId
    }
  }
};