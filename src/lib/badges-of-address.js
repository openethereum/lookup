'use strict'

const Badges = require('./badges')

const addressHasBadge = (address, badge) => {
  const {contract} = badge

  return contract.certified
    .call({}, [ address ])
}

const badgesOfAddress = (allBadges, address) => {
  const promises = allBadges
    .map((badge) => {
      return addressHasBadge(address, badge)
        .catch(() => false) // in case of an error we assume address doesn't have it
        .then((hasBadge) => ({badge, hasBadge}))
    })

  return Promise.all(promises)
    .then((badges) => {
      return badges
        .filter(({hasBadge}) => hasBadge)
        .map(({badge}) => {
          const cleanBadge = Object.assign({}, badge)
          delete cleanBadge.contract

          return cleanBadge
        })
    })
}

module.exports = (api, address) => {
  return Badges.all(api)
    .then((allBadges) => {
      return badgesOfAddress(allBadges, address)
    })
}
