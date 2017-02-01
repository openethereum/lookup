'use strict'

const {keccak_256} = require('js-sha3')

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
  if (typeof hex !== 'string') return false
  return validBytes32.test(hex)
}

const validAddress = /^(0x)?[0-9a-z]{40}$/i

const isValidAddress = (hex) => {
  if (typeof hex !== 'string') return false
  return validAddress.test(hex)
}

const sha3 = (data) => {
  return '0x' + keccak_256(data)
}

module.exports = {zero20, zero32, toAscii, isValidAddress, isValidBytes32, sha3}
