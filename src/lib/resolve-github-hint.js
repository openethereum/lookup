'use strict'

const GithubHint = require('../contracts/github-hint')

const resolveGitHubHint = (contract, hash) => {
  return contract.entries
    .call({}, [ hash ])
    .then((data) => {
      return data[0] || null
    })
}

module.exports = (api, hash) => {
  return GithubHint.get(api)
    .then((contract) => {
      return resolveGitHubHint(contract, hash)
    })
}
