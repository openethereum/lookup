'use strict'

const web3 = require('./web3')
const registry = require('./registry')
const sha3 = require('web3/lib/utils/sha3')

const address = registry.getAddress('0x' + sha3('githubhint'), 'A')
const abi = require('../contracts/GithubHint.json')
const contract = web3.eth.contract(abi).at(address)

const resolveGitHubHint = (hash) => {
  const data = contract.entries(hash)
  return data[0] || null
}

module.exports = resolveGitHubHint
