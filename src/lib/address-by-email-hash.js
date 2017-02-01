'use strict'

const {zero20} = require('../util')
const ProofOfEmail = require('../contracts/proof-of-email')

const addressByEmailHash = (contract, emailHash) =>
  new Promise((resolve, reject) => {
    contract.reverse(emailHash, (err, address) => {
      if (err) reject(err)
      else if (address === zero20) resolve(null)
      else resolve(address)
    })
  })

module.exports = (api, emailHash) => {
  const contract = ProofOfEmail.get(api)
  return addressByEmailHash(contract, emailHash)
}
