'use strict'

const web3 = require('./web3')
const {zero20} = require('./util')
const badgeReg = require('./badge-reg')

const address = badgeReg.fromName.call('emailverification5')[1]
const abi = require('../contracts/ProofOfEmail.json')
const contract = web3.eth.contract(abi).at(address)

const addressByEmailHash = (emailHash) =>
  new Promise((resolve, reject) => {
    contract.reverse(emailHash, (err, address) => {
      if (err) reject(err)
      else if (address === zero20) resolve(null)
      else resolve(address)
    })
  })

module.exports = addressByEmailHash
