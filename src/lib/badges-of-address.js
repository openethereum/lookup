'use strict'

const Badges = require('./badges')

const addressHasBadge = (address, badge) => {
  const {contract} = badge

  return new Promise((resolve, reject) => {
    contract.certified(address, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const badgesOfAddress = (allBadges, address) =>
  Promise.all(allBadges.map((badge) =>
    addressHasBadge(address, badge)
    .catch(() => false) // in case of an error we assume address doesn't have it
    .then((hasBadge) => ({badge, hasBadge}))
  ))
  .then((badges) =>
    badges
    .filter(({hasBadge}) => hasBadge)
    .map(({badge}) => {
      const cleanBadge = Object.assign({}, badge)
      delete cleanBadge.contract

      return cleanBadge
    })
  )

module.exports = (api, address) => {
  const allBadges = Badges.all(api)
  return badgesOfAddress(allBadges, address)
}
