'use strict'

const Web3 = require('web3')
const sha3 = require('web3/lib/utils/sha3')

const Lookup = require('../')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

Lookup
  .byName(web3, 'ngotchac')
  .then((result) => {
    console.log('=> looked up name "ngotchac":')
    console.log('     ' + JSON.stringify(result, null, 2).split('\n').join('\n      '))
    console.log('')
  })
  .catch((error) => {
    console.error(error)
  })

Lookup
  .byAddress(web3, '0x639ba260535db072a41115c472830846e4e9ad0f')
  .then((result) => {
    console.log('looked up address "0x639ba260535db072a41115c472830846e4e9ad0f":')
    console.log('     ' + JSON.stringify(result, null, 2).split('\n').join('\n      '))
    console.log('')
  })
  .catch((error) => {
    console.error(error)
  })

Lookup
  .byEmail(web3, '0x' + sha3('ngotchac@gmail.com'))
  .then((result) => {
    console.log('looked up address "ngotchac@gmail.com":')
    console.log('     ' + JSON.stringify(result, null, 2).split('\n').join('\n      '))
    console.log('')
  })
  .catch((error) => {
    console.error(error)
  })
