'use strict'

const {sha3} = require('../util')
const Registry = require('./registry')
const abi = require('./abi/TokenReg.json')

let contract = null

function init (api) {
  if (!contract) {
    return Registry.get(api)
      .then((registry) => {
        return registry.getAddress.call({}, [ sha3('tokenreg'), 'A' ])
      })
      .then((address) => {
        contract = api.newContract(abi, address).instance
      })
  }

  return Promise.resolve()
}

function get (api) {
  return init(api)
    .then(() => {
      return contract
    })
}

module.exports = {
  init,
  get
}
