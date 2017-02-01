'use strict'

const TokenReg = require('./token-reg')
const resolveGitHubHint = require('./resolve-github-hint')

const {zero32} = require('./util')

const abi = require('../contracts/EIP20.json')

let instance = null

module.exports = {
  all: (api) => {
    if (!instance || instance.api !== api) {
      const tokenReg = TokenReg.get(api)
      const nrOfTokens = +tokenReg.tokenCount.call()
      const allTokens = []

      for (let id = 0; id < nrOfTokens; id++) {
        const [address, TLA, base, name] = tokenReg.token.call(id)
        const contract = api.eth.contract(abi).at(address)

        let img = tokenReg.meta.call(id, 'IMG')
        img = img === zero32 ? null : resolveGitHubHint(api, img)

        allTokens.push({
          id, address, contract, TLA, base, name, img
        })
      }

      instance = {api, tokens: allTokens}
    }

    return instance.tokens
  }
}
