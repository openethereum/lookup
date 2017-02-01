const BadgeReg = require('./contracts/badge-reg')
const GithubHint = require('./contracts/github-hint')
const ProofOfEmail = require('./contracts/proof-of-email')
const Registry = require('./contracts/registry')
const TokenReg = require('./contracts/token-reg')

module.exports = function init (api, config) {
  return Registry.init(api, config || {})
    .then(() => {
      const promises = [
        BadgeReg.init(api),
        GithubHint.init(api),
        ProofOfEmail.init(api),
        TokenReg.init(api)
      ]

      return Promise.all(promises)
    })
}
