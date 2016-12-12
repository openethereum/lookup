'use strict'

const web3 = require('./web3')

const blockNumber = () =>
  new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((err, nr) => {
      if (err) reject(err)
      else resolve(nr)
    })
  })

module.exports = {blockNumber}
