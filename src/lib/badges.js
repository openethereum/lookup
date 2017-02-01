'use strict'

const BadgeReg = require('../contracts/badge-reg')
const resolveGitHubHint = require('./resolve-github-hint')

const {zero20, zero32, toAscii} = require('../util')

const abi = require('../contracts/abi/certifier.json')

let instance = null

module.exports = {
  all: (api) => {
    if (!instance || instance.api !== api) {
      const badgeReg = BadgeReg.get(api)
      const nrOfBadges = +badgeReg.badgeCount.call()
      const allBadges = []

      for (let id = 0; id < nrOfBadges; id++) {
        const [address, name] = badgeReg.badge.call(id)
        if (address === zero20 || name === zero32) continue

        const title = badgeReg.meta.call(id, 'TITLE')
        const contract = api.eth.contract(abi).at(address)

        let img = badgeReg.meta.call(id, 'IMG')
        if (img !== zero32) img = resolveGitHubHint(api, img)

        allBadges.push({
          id,
          address,
          contract,
          name: toAscii(name),
          title: title === zero32 ? null : toAscii(title),
          img: img === zero32 ? null : img
        })
      }

      instance = {api, badges: allBadges}
    }

    return instance.badges
  }
}
