'use strict'

const Registry = require('../contracts/registry')
const {sha3, zero20} = require('../util')

const addressByName = (registry, name) => {
  return registry.getAddress
    .call({}, [ sha3(name), 'A' ])
    .then((name) => {
      if (!name || name === zero20) {
        return null
      }

      return name
    })
}

module.exports = (api, name) => {
  return Registry.get(api)
    .then((registry) => {
      return addressByName(registry, name)
    })
}
