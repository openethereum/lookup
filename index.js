'use strict'

const byAddress = require('./src/lookups/address')
const byEmail = require('./src/lookups/email')
const byName = require('./src/lookups/name')

const init = require('./src/init')

function initialize (api, config) {
  return init(api, config || {})
}

module.exports = (api, config) => {
  const p = initialize(api, config)

  return {
    byAddress: function (address) {
      return p.then(() => byAddress(api, address))
    },

    byEmail: function (email) {
      return p.then(() => byEmail(api, email))
    },

    byName: function (name) {
      return p.then(() => byName(api, name))
    }
  }
}
