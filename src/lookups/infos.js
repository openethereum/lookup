'use strict'

const badgesOfAddress = require('../lib/badges-of-address')
const tokenBalancesOfAddress = require('../lib/token-balances-of-address')

module.exports = function addressInfo (api, address) {
  const promises = [
    badgesOfAddress(api, address),
    tokenBalancesOfAddress(api, address)
  ]

  return Promise.all(promises)
    .then(([ badges, tokens ]) => {
      return { badges, tokens }
    })
}
