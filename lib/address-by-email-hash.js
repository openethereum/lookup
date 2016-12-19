'use strict'

const web3 = require('./web3')
const {blockNumber} = require('./util')
const badgeReg = require('./badge-reg')

const address = badgeReg.fromName.call('emailverification5')[1]
const abi = require('../contracts/ProofOfEmail.json')
const contract = web3.eth.contract(abi).at(address)

const findRequest = (emailHash, latestBlock) =>
  new Promise((resolve, reject) => {
    const watcher = contract.Requested({emailHash}, {fromBlock: 0, toBlock: latestBlock})
    watcher.watch((err, log) => {
      watcher.stopWatching()
      if (err) reject(err)
      else resolve(log)
    })
  })

const findConfirm = (who, latestBlock) =>
  new Promise((resolve, reject) => {
    const watcher = contract.Confirmed({who}, {fromBlock: 0, toBlock: latestBlock})
    watcher.watch((err, log) => {
      watcher.stopWatching()
      if (err) reject(err)
      else resolve(log)
    })
  })

const addressByEmailHash = (emailHash) =>
  blockNumber().then((latestBlock) => {
    return findRequest(emailHash, latestBlock)
    .then((log) => findConfirm(log.args.who))
    .then((log) => log.args.who)
  })

module.exports = addressByEmailHash
