'use strict'

const Web3 = require('web3')
const config = require('config')

const {location, user, password} = config.parity
const web3 = new Web3(new Web3.providers.HttpProvider(location, 0, user, password))

module.exports = web3
