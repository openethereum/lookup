'use strict'

const Web3 = require('web3')

const Lookup = require('../')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

Lookup
  .name(web3, 'ngotchac')
  .then((result) => {
    console.log('looked up "ngotchac"', result)
  })
  .catch((error) => {
    console.error(error)
  })
