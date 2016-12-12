'use strict'

const web3 = require('./web3')
const cfg = require('config')

const abi = require('../contracts/TokenReg.json')
const contract = web3.eth.contract(abi).at(cfg.tokenRegAddress)

module.exports = contract
