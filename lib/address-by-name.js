'use strict'

const sha3 = require('web3/lib/utils/sha3')
const registry = require('./registry')
const {zero20} = require('./util')

const addressByName = (name) =>
  new Promise((resolve, reject) => {
    registry.getAddress('0x' + sha3(name), 'A', (err, name) => {
      if (err) reject(err)
      else if (!name || name === zero20) resolve(null)
      else resolve(name)
    })
  })

module.exports = addressByName
