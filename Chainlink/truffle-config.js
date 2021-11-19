const HDWalletProvider = require('truffle-hdwallet-provider')
const PrivateKeyProvider = require("truffle-privatekey-provider")

module.exports = {
  networks: {
    cldev: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    live: {
      provider: () => {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.RPC_URL)
      },
      network_id: '*',
      // Necessary due to https://github.com/trufflesuite/truffle/issues/1971
      // Should be fixed in Truffle 5.0.17
      skipDryRun: true,
    },
    deployment: {
      provider: new PrivateKeyProvider(process.env.privateKey, process.env.provider),
      network_id: process.env.networkId
    }
  },
  compilers: {
    solc: {
      version: '0.4.24',
    },
  },
}
