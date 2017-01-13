'use strict'

const co = require('co-express')
const boom = require('boom')
const sha3 = require('web3/lib/utils/sha3')
const {isValidAddress} = require('./lib/util')

const addressByEmailHash = require('./lib/address-by-email-hash')
const nameOfAddress = require('./lib/name-of-address')
const badgesOfAddress = require('./lib/badges-of-address')
const tokenBalancesOfAddress = require('./lib/token-balances-of-address')

module.exports = co(function* (req, res) {
  const data = {}

  if (req.query.email) {
    const email = req.query.email
    if (typeof email !== 'string' || email.indexOf('@') < 0) throw boom.badRequest('E-mail is invalid.')
    const emailHash = '0x' + sha3(email)

    try {
      data.address = yield addressByEmailHash(emailHash)
    } catch (err) {
      throw boom.wrap(err, 500, 'An error occured while querying Parity')
    }
  } else if (req.query.address) {
    const address = req.query.address
    if (typeof address !== 'string' || isValidAddress(address)) throw boom.badRequest('E-mail is invalid.')
    data.address = address
  } else {
    throw boom.badRequest('Missing email or address parameter.')
  }

  try {
    data.name = yield nameOfAddress(data.address)
  } catch (err) {
    throw boom.wrap(err, 500, 'An error occured while querying Parity')
  }

  try {
    data.badges = yield badgesOfAddress(data.address)
  } catch (err) {
    throw boom.wrap(err, 500, 'An error occured while querying Parity')
  }

  try {
    data.tokens = yield tokenBalancesOfAddress(data.address)
  } catch (err) {
    throw boom.wrap(err, 500, 'An error occured while querying Parity')
  }

  res.json(data)
})
