'use strict'

const byAddress = require('./src/lookups/address')
const byEmail = require('./src/lookups/email')
const byName = require('./src/lookups/name')

const init = require('./src/init')

function initialize (api, config) {
  return init(api, config || {})
}

module.exports = {
  init: initialize,
  byAddress,
  byEmail,
  byName
}
