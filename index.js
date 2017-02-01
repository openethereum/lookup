'use strict'

const addressByEmailHash = require('./lib/address-by-email-hash')
const nameOfAddress = require('./lib/name-of-address')
const addressByName = require('./lib/address-by-name')
const badgesOfAddress = require('./lib/badges-of-address')
const tokenBalancesOfAddress = require('./lib/token-balances-of-address')

module.exports = {
  addressByEmailHash,
  nameOfAddress,
  addressByName,
  badgesOfAddress,
  tokenBalancesOfAddress
}
