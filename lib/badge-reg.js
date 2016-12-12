'use strict'

const web3 = require('./web3')
const cfg = require('config')

const abi = require('../contracts/BadgeReg.json')
const contract = web3.eth.contract(abi).at(cfg.badgeRegAddress)

module.exports = contract
