'use strict'

const co = require('co-express')
const boom = require('boom')
const sha3 = require('web3/lib/utils/sha3')

const addressByEmailHash = require('./lib/address-by-email-hash')

module.exports = co(function* (req, res) {
  const email = req.query.email
  if (typeof email !== 'string' || email.indexOf('@') < 0) throw boom.badRequest('E-mail is invalid.')

  const emailHash = '0x' + sha3(email)
  const data = {}

  try {
    data.address = yield addressByEmailHash(emailHash)
  } catch (err) {
    console.error(err)
    throw boom.internal('An error occured while querying Parity.')
  }

  res.json(data)
})
