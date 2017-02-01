'use strict'

const BadgeReg = require('./badge-reg')
const abi = require('./abi/ProofOfEmail.json')

let instance = null

module.exports = {
  get: (api) => {
    if (!instance || instance.api !== api) {
      const badgeReg = BadgeReg.get(api)
      const address = badgeReg.fromName.call('emailverification')[1]
      const contract = api.eth.contract(abi).at(address)

      instance = {api, contract}
    }

    return instance.contract
  }
}
