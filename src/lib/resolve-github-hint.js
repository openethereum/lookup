'use strict'

const GithubHint = require('../contracts/github-hint')

const resolveGitHubHint = (contract, hash) => {
  const data = contract.entries(hash)
  return data[0] || null
}

module.exports = (api, hash) => {
  const contract = GithubHint.get(api)
  return resolveGitHubHint(contract, hash)
}
