'use strict'

const abi = require('./abi/SimpleRegistry.json')

let address = ''
let contract = null

function getAddress (api, config) {
  const {registryAddress} = config || {}

  if (registryAddress) {
    return Promise.resolve(registryAddress)
  }

  return api.parity
    .registryAddress()
    .then((fetchedAddress) => {
      return fetchedAddress
    })
    .catch(() => address)
}

function init (api, config) {
  const {registryAddress} = config || {}

  if (!contract || (registryAddress && registryAddress !== address)) {
    address = registryAddress || address

    return getAddress(api, config)
      .then((registryAddress) => {
        contract = api.newContract(abi, registryAddress).instance
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
