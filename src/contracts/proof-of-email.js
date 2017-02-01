'use strict'

const BadgeReg = require('./badge-reg')
const abi = require('./abi/ProofOfEmail.json')

let contract = null

function init (api) {
  if (!contract) {
    return BadgeReg.get(api)
      .then((badgeReg) => {
        return badgeReg.fromName.call({}, [ 'emailverification' ])
      })
      .then((addresses) => {
        const address = addresses[1]
        contract = api.newContract(abi, address).instance
      })
  }

  return Promise.resolve()
}

function get (api) {
  return init(api)
    .then(() => {
      return contract
    })
}

module.exports = {
  init,
  get
}
