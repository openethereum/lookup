'use strict'

const express = require('express')
const hsts = require('hsts')
const corser = require('corser')
const noCache = require('nocache')()
const config = require('config')
const spdy = require('spdy')
const fs = require('fs')

const lookup = require('./lookup')

const api = express()
module.exports = api

api.use(hsts({maxAge: 3 * 24 * 60 * 60 * 1000})) // 3 days

// CORS
const allowed = corser.simpleRequestHeaders.concat(['User-Agent'])
api.use(corser.create({requestHeaders: allowed}))

api.get('/', noCache, lookup)

api.use((err, req, res, next) => {
  if (res.headersSent) return next()
  console.error(err.stack)
  if (err.isBoom) err = err.output.payload

  return res
  .status(err.statusCode || 500)
  .json({status: 'error', message: err.message})
})

spdy.createServer({
  cert: fs.readFileSync(config.http.cert),
  key: fs.readFileSync(config.http.key)
}, api)
  .listen(config.http.port, (err) => {
    if (err) return console.error(err)
    console.info(`Listening on ${config.http.port}.`)
  })
