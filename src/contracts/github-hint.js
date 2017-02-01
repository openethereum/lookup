'use strict'

const {sha3} = require('../util')
const Registry = require('./registry')
const abi = require('./abi/GithubHint.json')

let instance = null

module.exports = {
  get: (api) => {
    if (!instance || instance.api !== api) {
      const registry = Registry.get(api)
      const address = registry.getAddress(sha3('githubhint'), 'A')
      const contract = api.eth.contract(abi).at(address)

      instance = {api, contract}
    }

    return instance.contract
  }
}
