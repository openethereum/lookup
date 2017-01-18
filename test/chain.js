'use strict'

const fs = require('fs')
const path = require('path')
const so = require('so')

const web3 = require('./web3')
const deploy = require('./deploy')

const REGISTRY = {
  abi: JSON.parse(fs.readFileSync(path.join(__dirname, 'SimpleRegistry.abi'))),
  code: fs.readFileSync(path.join(__dirname, 'SimpleRegistry.bin')).toString('utf8'),
  address: '0x1111111111111111111111111111111111111111'
}
const TOKENREG = {
  abi: JSON.parse(fs.readFileSync(path.join(__dirname, 'TokenReg.abi'))),
  code: fs.readFileSync(path.join(__dirname, 'TokenReg.bin')).toString('utf8'),
  address: '0x2222222222222222222222222222222222222222'
}
const BADGEREG = {
  abi: JSON.parse(fs.readFileSync(path.join(__dirname, 'BadgeReg.abi'))),
  code: fs.readFileSync(path.join(__dirname, 'BadgeReg.bin')).toString('utf8'),
  address: '0x3333333333333333333333333333333333333333'
}
const OPRAHBADGE = {
  abi: JSON.parse(fs.readFileSync(path.join(__dirname, 'OprahBadge.abi'))),
  code: fs.readFileSync(path.join(__dirname, 'OprahBadge.bin')).toString('utf8'),
  address: '0x4444444444444444444444444444444444444444'
}

const showError = (err) => {
  console.error(err)
  process.exit(1)
}

const getOwner = (web3) => new Promise((resolve, reject) => {
  web3.eth.getAccounts((err, accounts) => {
    if (err) reject(err)
    else resolve(accounts)
  })
})

so(function* () {
  const [owner, user] = yield getOwner(web3)
  console.info('owner', owner, 'user', user)

  const registry = yield deploy(web3, REGISTRY.abi, REGISTRY.code, REGISTRY.address, [], {from: owner})
  console.info('SimpleRegistry at', registry.address)
  const tokenReg = yield deploy(web3, TOKENREG.abi, TOKENREG.code, TOKENREG.address, [], {from: owner})
  console.info('TokenReg at', tokenReg.address)
  const badgeReg = yield deploy(web3, BADGEREG.abi, BADGEREG.code, BADGEREG.address, [], {from: owner})
  console.info('BadgeReg at', badgeReg.address)
  const oprahBadge = yield deploy(web3, OPRAHBADGE.abi, OPRAHBADGE.code, OPRAHBADGE.address, [], {from: owner})
  console.info('OprahBadge at', oprahBadge.address)
})()
.catch(showError)
