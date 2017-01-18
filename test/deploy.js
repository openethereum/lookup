'use strict'

const {isValidAddress} = require('../lib/util')

const deploy = (web3, abi, code, address, params = [], opt = {}) => new Promise((resolve, reject) => {
  if (!Array.isArray(abi)) throw new Error('abi must be an array')
  if (typeof code !== 'string') throw new Error('code must be a string')
  if (!isValidAddress(address)) throw new Error('address must be a valid address')

  web3.eth
  .contract(abi)
  .new(...params, opt, (err, contract) => {
    if (err) reject(err)
    else resolve(contract)
  })
})

module.exports = deploy
