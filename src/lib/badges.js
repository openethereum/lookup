'use strict'

const BadgeReg = require('../contracts/badge-reg')
const resolveGitHubHint = require('./resolve-github-hint')

const {zero20, zero32, toAscii} = require('../util')

const abi = require('../contracts/abi/certifier.json')

let badges = null

function fetchBadge (api, badgeReg, id) {
  return badgeReg.badge
    .call({}, [ id ])
    .then(([address, bytesName]) => {
      const name = api.util.bytesToHex(bytesName)

      if (address === zero20 || name === zero32) {
        return null
      }

      return Promise
        .all([
          badgeReg.meta.call({}, [ id, 'TITLE' ]),
          badgeReg.meta
            .call({}, [ id, 'IMG' ])
            .then((img) => {
              if (img !== zero32) return resolveGitHubHint(api, img)
              return img
            })
        ])
        .then(([bytestitle, img]) => {
          const contract = api.newContract(abi, address).instance
          const title = api.util.bytesToHex(bytestitle)

          return {
            id,
            address,
            contract,
            name: toAscii(name),
            title: title === zero32 ? null : toAscii(title),
            img: img === zero32 ? null : img
          }
        })
    })
}

function init (api) {
  if (!badges) {
    return BadgeReg.get(api)
      .then((badgeReg) => {
        return badgeReg.badgeCount
          .call({}, [])
          .then((nrOfBadges) => {
            const promises = []

            for (let id = 0; id < nrOfBadges.toNumber(); id++) {
              const promise = fetchBadge(api, badgeReg, id)
              promises.push(promise)
            }

            return Promise.all(promises)
              .then((allBadges) => {
                badges = allBadges.filter((badge) => badge)
              })
          })
      })
  }

  return Promise.resolve()
}

function all (api) {
  return init(api)
    .then(() => {
      return badges
    })
}

module.exports = {
  init,
  all
}
