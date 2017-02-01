'use strict'

const nameOfAddress = require('../lib/name-of-address')
const addressInfo = require('./infos')

module.exports = function byAddress (api, address) {
  return nameOfAddress(api, address)
    .then((name) => {
      return addressInfo(api, address)
        .then((data) => {
          return Object.assign({}, {address, name}, data)
        })
    })
}
