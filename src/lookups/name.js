'use strict'

const addressByName = require('../lib/address-by-name')
const addressInfo = require('./infos')
const {isValidAddress} = require('../util')

module.exports = function byName (api, name) {
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
