'use strict'

const co = require('co-express')
const boom = require('boom')
const sha3 = require('web3/lib/utils/sha3')
const {isValidAddress, isValidBytes32} = require('./lib/util')

const addressByEmailHash = require('./lib/address-by-email-hash')
const nameOfAddress = require('./lib/name-of-address')
const addressByName = require('./lib/address-by-name')
const badgesOfAddress = require('./lib/badges-of-address')
const tokenBalancesOfAddress = require('./lib/token-balances-of-address')

module.exports = co(function* (req, res) {
  const data = {}

  if (req.query.email || req.query.emailHash) {
    let emailHash
    if (req.query.email) {
      const email = req.query.email
      if (typeof email !== 'string' || email.indexOf('@') < 0) throw boom.badRequest('E-mail is invalid.')
      emailHash = '0x' + sha3(email)
    } else {
      emailHash = req.query.emailHash
      if (!isValidBytes32(emailHash)) throw boom.badRequest('E-mail hash is invalid.')
    }

    try {
      data.address = yield addressByEmailHash(emailHash)
    } catch (err) {
      throw boom.wrap(err, 500, 'An error occured while querying Parity')
    }
  } else if (req.query.name) {
    const name = req.query.name
    if (typeof name !== 'string' || name.length === 0) throw boom.badRequest('Name is invalid.')

    try {
      data.address = yield addressByName(name)
    } catch (err) {
      throw boom.wrap(err, 500, 'An error occured while querying Parity')
    }
  } else if (req.query.address) {
    const address = req.query.address
    if (typeof address !== 'string' || isValidAddress(address)) throw boom.badRequest('Address is invalid.')
    data.address = address
  } else {
    throw boom.badRequest('Missing e-mail, name or address parameter.')
  }

  if (!data.address) throw boom.notFound('Could not find this account.')

  if (!data.name) {
    try {
      data.name = yield nameOfAddress(data.address)
    } catch (err) {
      throw boom.wrap(err, 500, 'An error occured while querying Parity')
    }
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
