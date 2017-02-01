'use strict'

const BigNumber = require('bignumber.js')

const Tokens = require('./tokens')

const tokenBalanceOfAddress = (address, token) => {
  const {contract} = token

  return new Promise((resolve, reject) => {
    contract.balanceOf(address, (err, balance) => {
      if (err) reject(err)
      else resolve(balance.dividedBy(token.base))
    })
  })
}

const ETH = {
  TLA: 'ETH',
  name: 'Ether',
  base: new BigNumber('1e+18'),
  img: 'https://raw.githubusercontent.com/ethcore/parity/1e6a2cb/js/assets/images/contracts/ethereum-black-64x64.png'
}

const ethOfAddress = (api, address) => new Promise((resolve, reject) => {
  api.eth.getBalance(address, (err, balance) => {
    if (err) reject(err)
    else resolve(balance.dividedBy(ETH.base))
  })
})

const tokenBalancesOfAddress = (api, allTokens, address) => {
  const tasks = allTokens.map((token) =>
    tokenBalanceOfAddress(address, token)
    .catch(() => new BigNumber(0)) // in case of an error we assume address has 0
    .then((balance) => Object.assign({}, token, {balance}))
  ).concat(
    ethOfAddress(api, address)
    .catch(() => new BigNumber(0)) // in case of an error we assume address has 0
    .then((balance) => Object.assign({}, ETH, {balance}))
  )

  return Promise.all(tasks)
  .then((tokens) =>
    tokens
    .filter(({balance}) => balance.gt(0))
    .map((token) => Object.assign({}, token, {balance: token.balance.toJSON()}))
  )
}

module.exports = (api, address) => {
  const allTokens = Tokens.all()
  tokenBalancesOfAddress(api, allTokens, address)
}
