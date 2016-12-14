'use strict'

const web3 = require('./web3')
const cfg = require('config')

const abi = require('../contracts/Registry.json')
const contract = web3.eth.contract(abi).at(cfg.registryAddress)

module.exports = contract
