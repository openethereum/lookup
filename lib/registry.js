'use strict'

const abi = require('../contracts/SimpleRegistry.json')
const registryAddress = '0x81a4b044831c4f12ba601adb9274516939e9b8a2'

let instance = null

module.exports = {
  get: (api) => {
    if (!instance || instance.api !== api) {
      const contract = api.eth.contract(abi).at(registryAddress)
      instance = {api, contract}
    }

    return instance.contract
  }
}
