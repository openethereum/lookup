'use strict'

const Registry = require('../contracts/registry')

const nameOfAddress = (registry, address) =>
  new Promise((resolve, reject) => {
    registry.reverse(address, (err, name) => {
      if (err) reject(err)
      else if (!name) resolve(null)
      else resolve(name)
    })
  })

module.exports = (api, address) => {
  const registry = Registry.get(api)
  return nameOfAddress(registry, address)
}
