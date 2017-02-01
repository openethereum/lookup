const TestRPC = require('ethereumjs-testrpc')

const port = 8888
const server = TestRPC.server({
  debug: true,
  unlocked_accounts: [ 0 ]
})

server.listen(port, function(err, blockchain) {
  console.log('[testrpc] listening on port', port)
  const accounts = blockchain.unlocked_accounts

  console.log('[testrpc]', 'unlocked accounts:')
  Object.keys(accounts).forEach((address) => {
    console.log(`  => ${address}`)
  })

  console.log('')
})
