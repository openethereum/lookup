'use strict'

const addressByEmailHash = require('./src/lib/address-by-email-hash')
const nameOfAddress = require('./src/lib/name-of-address')
const addressByName = require('./src/lib/address-by-name')
const badgesOfAddress = require('./src/lib/badges-of-address')
const tokenBalancesOfAddress = require('./src/lib/token-balances-of-address')

module.exports = {
  addressByEmailHash,
  nameOfAddress,
  addressByName,
  badgesOfAddress,
  tokenBalancesOfAddress
}
