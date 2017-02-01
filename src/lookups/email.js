'use strict'

const addressByEmailHash = require('../lib/address-by-email-hash')
const {isValidAddress} = require('../util')

const byAddress = require('./address')

module.exports = function byEmail (api, hash) {
  return addressByEmailHash(api, hash)
    .then((address) => {
      if (!isValidAddress(address)) {
        return null
      }

      return byAddress(api, address)
    })
}
