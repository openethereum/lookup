'use strict'

const web3 = require('./web3')
const badgeReg = require('./badge-reg')
const resolveGitHubHint = require('./resolve-github-hint')

const {zero20, zero32, toAscii} = require('./util')

const abi = require('../contracts/certifier.json')

const nrOfBadges = +badgeReg.badgeCount.call()
const allBadges = []

for (let id = 0; id < nrOfBadges; id++) {
  const [address, name] = badgeReg.badge.call(id)
  if (address === zero20 || name === zero32) continue
  const title = badgeReg.meta.call(id, 'TITLE')

  let img = badgeReg.meta.call(id, 'IMG')
  if (img !== zero32) img = resolveGitHubHint(img)

  allBadges.push({
    id,
    address,
    name: toAscii(name),
    title: title === zero32 ? null : toAscii(title),
    img: img === zero32 ? null : img
  })
}

const addressHasBadge = (address, badge) => {
  const contract = web3.eth.contract(abi).at(badge.address)

  return new Promise((resolve, reject) => {
    contract.certified(address, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const badgesOfAddress = (address) =>
  Promise.all(allBadges.map((badge) =>
    addressHasBadge(address, badge)
    .catch(() => false) // in case of an error we assume address doesn't have it
    .then((hasBadge) => ({badge, hasBadge}))
  ))
  .then((badges) =>
    badges
    .filter(({hasBadge}) => hasBadge)
    .map(({badge}) => badge)
  )

module.exports = badgesOfAddress
