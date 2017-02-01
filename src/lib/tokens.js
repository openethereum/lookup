'use strict'

const TokenReg = require('../contracts/token-reg')
const resolveGitHubHint = require('./resolve-github-hint')

const {zero32} = require('../util')

const abi = require('../contracts/abi/EIP20.json')

let tokens = null

function fetchToken (api, tokenReg, id) {
  return tokenReg.token
    .call({}, [id])
    .then(([address, TLA, base, name]) => {
      const contract = api.newContract(abi, address).instance

      return tokenReg.meta
        .call({}, [id, 'IMG'])
        .then((img) => img === zero32 ? null : resolveGitHubHint(api, img))
        .then((img) => {
          return {
            id, address, contract, TLA, base, name, img
          }
        })
    })
}

function init (api) {
  if (!tokens) {
    return TokenReg.get(api)
      .then((tokenReg) => {
        return tokenReg.tokenCount
          .call({}, [])
          .then((nrOfTokens) => {
            const promises = []

            for (let id = 0; id < nrOfTokens.toNumber(); id++) {
              const promise = fetchToken(api, tokenReg, id)
              promises.push(promise)
            }

            return Promise.all(promises)
          })
          .then((allTokens) => {
            tokens = allTokens
          })
      })
  }

  return Promise.resolve()
}

function all (api) {
  return init(api)
    .then(() => {
      return tokens
    })
}

module.exports = {
  init,
  all
}
