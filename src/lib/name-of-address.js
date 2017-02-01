'use strict'

const Registry = require('../contracts/registry')

const nameOfAddress = (registry, address) => {
  return registry.reverse
    .call({}, [address])
    .then((name) => {
      return name || null
    })
}

module.exports = (api, address) => {
  return Registry.get(api)
    .then((registry) => {
      return nameOfAddress(registry, address)
    })
}
