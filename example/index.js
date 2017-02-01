'use strict'

const util = require('util')
const {Api} = require('@parity/parity.js')

const print = (val) => util.inspect(val, {depth: null, colors: true})
const indent = (str) => '    ' + str.split('\n').join('\n    ') + '\n'

// do the setup
const transport = new Api.Transport.Http('http://localhost:8545')
const api = new Api(transport)
api.transport._connectTimeout = -1

const {sha3} = require('../src/util')

const lookup = require('../')(api)

// Lookup.init(api, { registryAddress: '0xdeadbeafdeadbeafdeadbeafdeadbeafdeadbeaf' })
lookup
  .byName('ngotchac')
  .then((result) => {
    console.log('=> looked up name "ngotchac":')
    console.log(indent(print(result)))
  })
  .catch((error) => {
    console.error(error)
  })

lookup
  .byAddress('0x639ba260535db072a41115c472830846e4e9ad0f')
  .then((result) => {
    console.log('=> looked up address "0x639ba260535db072a41115c472830846e4e9ad0f":')
    console.log(indent(print(result)))
  })
  .catch((error) => {
    console.error(error)
  })

lookup
  .byEmail(sha3('ngotchac@gmail.com'))
  .then((result) => {
    console.log('=> looked up address "ngotchac@gmail.com":')
    console.log(indent(print(result)))
  })
  .catch((error) => {
    console.error(error)
  })
