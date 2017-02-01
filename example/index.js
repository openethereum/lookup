'use strict'

const {Api} = require('@parity/parity.js');

// do the setup
const transport = new Api.Transport.Http('http://localhost:8545');
const api = new Api(transport);

const {sha3} = require('../src/util')

const Lookup = require('../')

Lookup
  .byName(api, 'ngotchac')
  .then((result) => {
    console.log('=> looked up name "ngotchac":')
    console.log('     ' + JSON.stringify(result, null, 2).split('\n').join('\n      '))
    console.log('')
  })
  .catch((error) => {
    console.error(error)
  })

Lookup
  .byAddress(api, '0x639ba260535db072a41115c472830846e4e9ad0f')
  .then((result) => {
    console.log('looked up address "0x639ba260535db072a41115c472830846e4e9ad0f":')
    console.log('     ' + JSON.stringify(result, null, 2).split('\n').join('\n      '))
    console.log('')
  })
  .catch((error) => {
    console.error(error)
  })

Lookup
  .byEmail(api, sha3('ngotchac@gmail.com'))
  .then((result) => {
    console.log('looked up address "ngotchac@gmail.com":')
    console.log('     ' + JSON.stringify(result, null, 2).split('\n').join('\n      '))
    console.log('')
  })
  .catch((error) => {
    console.error(error)
  })
