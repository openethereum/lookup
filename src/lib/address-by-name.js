'use strict'

const Registry = require('../contracts/registry')
const {sha3, zero20} = require('../util')

const addressByName = (registry, name) =>
  new Promise((resolve, reject) => {
    registry.getAddress(sha3(name), 'A', (err, name) => {
      if (err) reject(err)
      else if (!name || name === zero20) resolve(null)
      else resolve(name)
    })
  })

module.exports = (api, name) => {
  const registry = Registry.get(api)
  return addressByName(registry, name)
}
