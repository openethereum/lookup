const test = require('tape')

const addressByName = require('./address-by-name')
const {api} = require('../../test/api')

test('addressByName', function (t) {
  t.plan(2)

  addressByName(api, 'ngotchac')
    .then((address) => {
      t.equal(address.toLowerCase(), '0x634bd930e2bf75325bd2288500f0efa5d46d26fe')
    })
    .catch((e) => {
      t.fail(e)
    })

  addressByName(api, 'foobarrendom')
    .then((address) => {
      t.equal(address, null)
    })
    .catch((e) => {
      t.fail(e)
    })
})
