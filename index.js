'use strict'

const byAddress = require('./src/lookups/address')
const byEmail = require('./src/lookups/email')
const byName = require('./src/lookups/name')

const init = require('./src/init')

let _api = null

function initialize (api, config) {
  _api = api
  return init(api, config || {})
}

module.exports = {
  init: initialize,
  byAddress: function (api, address) {
    if (address === undefined && typeof api === 'string') {
      if (!_api) {
        throw new Error('the lookup service is not initialized yet')
      }

      return byAddress(_api, api)
    }

    return byAddress(api, address)
  },
  byEmail: function (api, email) {
    if (email === undefined && typeof api === 'string') {
      if (!_api) {
        throw new Error('the lookup service is not initialized yet')
      }

      return byEmail(_api, api)
    }

    return byEmail(api, email)
  },
  byName: function (api, name) {
    if (name === undefined && typeof api === 'string') {
      if (!_api) {
        throw new Error('the lookup service is not initialized yet')
      }

      return byName(_api, api)
    }

    return byName(api, name)
  }
}
