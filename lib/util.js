'use strict'

const web3 = require('./web3')

const blockNumber = () =>
  new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((err, nr) => {
      if (err) reject(err)
      else resolve(nr)
    })
  })

const zero20 = '0x0000000000000000000000000000000000000000'
const zero32 = '0x0000000000000000000000000000000000000000000000000000000000000000'

const leading0x = /^0x/
const trailing0s = /0+$/

const toAscii = (hex) => {
  if (typeof hex !== 'string') throw new Error('toAscii: invalid hex value')
  hex = hex.trim().replace(leading0x, '').replace(trailing0s, '')

  let result = ''
  for (let i = 0; i < hex.length; i += 2) {
    const code = parseInt(hex.substr(i, 2), 16)
    result += String.fromCharCode(code)
  }
  return result
}

const validBytes32 = /^0x[0-9a-z]{64}$/i

const isValidBytes32 = (hex) => {
  if (typeof hex !== 'string') throw new Error('validBytes32: invalid hex value')
  return validBytes32.test(hex)
}

const validAddress = /^(0x)?[0-9a-z]{20}$/i

const isValidAddress = (hex) => {
  if (typeof hex !== 'string') throw new Error('validAddress: invalid hex value')
  return validAddress.test(hex)
}

module.exports = {blockNumber, zero20, zero32, toAscii, isValidAddress, isValidBytes32}
