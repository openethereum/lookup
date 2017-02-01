'use strict'

const {zero20} = require('../util')
const ProofOfEmail = require('../contracts/proof-of-email')

const addressByEmailHash = (contract, emailHash) => {
  return contract.reverse
    .call({}, [ emailHash ])
    .then((address) => {
      if (address === zero20) {
        return null
      }

      return address
    })
}

module.exports = (api, emailHash) => {
  return ProofOfEmail.get(api)
    .then((contract) => {
      return addressByEmailHash(contract, emailHash)
    })
}
