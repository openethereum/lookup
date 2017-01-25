'use strict'

const sha3 = require('web3/lib/utils/sha3')
const registry = require('./registry')
const web3 = require('./web3')

const abi = require('../contracts/TokenReg.json')
const address = registry.getAddress('0x' + sha3('tokenreg'), 'A')
const contract = web3.eth.contract(abi).at(address)

module.exports = contract
