'use strict'

const addressByEmailHash = require('./src/lib/address-by-email-hash')
const nameOfAddress = require('./src/lib/name-of-address')
const addressByName = require('./src/lib/address-by-name')
const badgesOfAddress = require('./src/lib/badges-of-address')
const tokenBalancesOfAddress = require('./src/lib/token-balances-of-address')

const {isValidAddress} = require('./src/util')

function addressInfo (api, address) {
  const promises = [
    badgesOfAddress(api, address),
    tokenBalancesOfAddress(api, address)
  ]

  return Promise.all(promises)
    .then(([ badges, tokens ]) => {
      return { badges, tokens }
    })
}

function email (api, hash) {
  return addressByEmailHash(api, name)
    .then((address) => {
      if (!isValidAddress(address)) {
        return null
      }

      return address(api, address)
    })
}

function name (api, name) {
  return addressByName(api, name)
    .then((address) => {
      if (!isValidAddress(address)) {
        return null
      }

      return addressInfo(api, address)
        .then((data) => {
          return Object.assign({}, {address, name}, data)
        })
    })
}

function address (api, address) {
  return nameOfAddress(api, address)
    .then((name) => {
      return addressInfo(api, address)
        .then((data) => {
          return Object.assign({}, {address, name}, data)
        })
    })
}

module.exports = {
  email, name, address
}
