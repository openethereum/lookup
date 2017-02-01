const test = require('tape')

const {setRegistry} = require('./api')

const fixtures = require('./fixtures')

test('fixtures', (t) => {
  t.plan(1)

  fixtures
    .run()
    .then((registry) => {
      setRegistry(registry)
      t.pass('loaded fixtures')
    })
})
