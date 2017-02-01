'use strict'

const abi = require('./abi/SimpleRegistry.json')
const registryAddress = '0x81a4b044831c4f12ba601adb9274516939e9b8a2'

let contract = null

function init (api) {
  if (!contract) {
    return Promise.resolve(registryAddress)
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
