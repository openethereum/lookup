'use strict'

const test = require('tape')
const co = require('co')
const createApi = require('lookup-test-tools/lib/create-api')
const fixtures = require('lookup-test-tools/lib/fixtures')
const register = require('lookup-test-tools/lib/register')
const emailVerifyAddress = require('lookup-test-tools/lib/email-verify-address')
const smsVerifyAddress = require('lookup-test-tools/lib/sms-verify-address')
const {isValidAddress, sha3} = require('./src/util')

const createLookup = require('.')

const setup = co.wrap(function* () {
  const api = createApi()
  const {account, registry, emailAddress, smsAddress} = yield fixtures.run(api)
  const ngotchac = (yield api.eth.accounts())[1]

  yield register(registry, account, 'ngotchac', {A: '0x634bd930e2bf75325bd2288500f0efa5d46d26fe'})
  yield emailVerifyAddress(api, emailAddress, account, ngotchac, 'ngotchac@example.org')
  yield smsVerifyAddress(api, smsAddress, account, ngotchac)

  return api
})

const isValidResponse = (t, res) => {
  t.ok(isValidAddress(res.address), 'invalid address: ' + res.address)
  // todo
}

test('lookup by address', (t) => {
  t.plan(1)

  setup()
    .then((api) => {
      const lookup = createLookup(api)
      return lookup.byAddress('0x634bd930e2bf75325bd2288500f0efa5d46d26fe')
    })
    .then((res) => isValidResponse(t, res))
    .catch(t.ifError)
})

test('lookup by name', (t) => {
  t.plan(1)

  setup()
    .then((api) => {
      const lookup = createLookup(api)
      return lookup.byName('ngotchac')
    })
    .then((res) => isValidResponse(t, res))
    .catch(t.ifError)
})

test.skip('lookup by email', (t) => {
  t.plan(1)

  setup()
    .then((api) => {
      const lookup = createLookup(api)
      return lookup.byEmail(sha3('ngotchac@example.org'))
    })
    .then((res) => isValidResponse(t, res))
    .catch(t.ifError)
})
