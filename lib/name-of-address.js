'use strict'

const registry = require('./registry')

const nameOfAddress = (address) =>
  new Promise((resolve, reject) => {
    registry.reverse(address, (err, name) => {
      if (err) reject(err)
      else if (!name) resolve(null)
      else resolve(name)
    })
  })

module.exports = nameOfAddress
