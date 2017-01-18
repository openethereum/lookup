'use strict'

const got = require('got')
const qs = require('qs')
const test = require('tape')

const fetch = (query) =>
  got('https://localhost:8443/?' + qs.stringify(query), {rejectUnauthorized: false, json: true})
  .then((res) => res.body)

test('address: 0x639ba260535Db072A41115c472830846E4e9AD0F', (t) => {
  t.plan(6)

  fetch({address: '0x639ba260535Db072A41115c472830846E4e9AD0F'})
  .then((res) => {
    t.equal(res.address, '0x639ba260535Db072A41115c472830846E4e9AD0F')
    t.equal(res.name, 'ngotchac')

    t.ok(Array.isArray(res.badges), 'badges is not an array')
    const emailVerified = res.badges.find((badge) => badge.id === 7)
    t.ok(emailVerified, 'account is not email-verified')

    t.ok(Array.isArray(res.tokens), 'tokens is not an array')
    const eth = res.tokens.find((token) => token.TLA === 'ETH')
    t.ok(eth, 'account does not hold ETH')
  })
  .catch(t.ifError)
})

test('email: jannis@ethcore.io', (t) => {
  t.plan(6)

  fetch({email: 'jannis@ethcore.io'})
  .then((res) => {
    t.equal(res.address, '0x00d189b71e5b42a88aa3e83173d4a6926e665336')
    t.equal(res.name, 'derhuerst')

    t.ok(Array.isArray(res.badges), 'badges is not an array')
    const smsVerified = res.badges.find((badge) => badge.id === 0)
    t.ok(smsVerified, 'account is not sms-verified')

    t.ok(Array.isArray(res.tokens), 'tokens is not an array')
    const eth = res.tokens.find((token) => token.TLA === 'ETH')
    t.ok(eth, 'account does not hold ETH')
  })
  .catch(t.ifError)
})

test('emailHash: sha3(jannis@ethcore.io)', (t) => {
  t.plan(1)

  fetch({emailHash: '0xc39c668305a16c70e893541650fffc6504f45c94a1f7f8ebe21dc62f7462f9a9'})
  .then((res) => {
    t.equal(res.address, '0x00d189b71e5b42a88aa3e83173d4a6926e665336')
  })
  .catch(t.ifError)
})

test('name: gavcoin', (t) => {
  t.plan(4)

  fetch({name: 'gavcoin'})
  .then((res) => {
    t.equal(res.address, '0x3d33f85da141d079888ae5f608ecf2c441368e5e')
    t.ok(Array.isArray(res.badges), 'badges is not an array')

    t.ok(Array.isArray(res.tokens), 'tokens is not an array')
    const eth = res.tokens.find((token) => token.TLA === 'ETH')
    t.ok(eth, 'account does not hold ETH')
  })
  .catch(t.ifError)
})
