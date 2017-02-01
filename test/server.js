const TestRPC = require('ethereumjs-testrpc')

const port = 8888
const server = TestRPC.server({
  debug: true,
  unlocked_accounts: [ 0 ]
})

function start (cb) {
  server.listen(port, function (err, blockchain) {
    if (err) {
      throw err
    }

    console.log('[testrpc] listening on port', port)
    const accounts = blockchain.unlocked_accounts

    console.log('[testrpc]', 'unlocked accounts:')
    Object.keys(accounts).forEach((address) => {
      console.log(`  => ${address}`)
    })

    console.log('')

    cb && cb()
  })
}

module.exports = {
  start,
  stop: () => {
    server.close()
  }
}
