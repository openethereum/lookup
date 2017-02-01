'use strict'

const {sha3} = require('./util')
const Registry = require('./registry')
const abi = require('../contracts/BadgeReg.json')

let instance = null

module.exports = {
  get: (api) => {
    if (!instance || instance.api !== api) {
      const registry = Registry.get(api)
      const address = registry.getAddress(sha3('badgereg'), 'A')
      const contract = api.eth.contract(abi).at(address)

      instance = {api, contract}
    }

    return instance.contract
  }
}
