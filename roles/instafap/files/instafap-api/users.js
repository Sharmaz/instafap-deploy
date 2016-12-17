'use strict'

import HttpHash from 'http-hash'
import { send, json } from 'micro'
import gravatar from 'gravatar'
import Db from 'instafap-db'
import DbStub from './test/stub/db'
import config from './config'

const env = process.env.NODE_ENV || 'production'
let db = new Db(config.db)

if (env === 'test') {
  db = new DbStub()
}

const hash = HttpHash()

hash.set('POST /', async function saveUser (req, res, params) {
  let user = await json(req)
  await db.connect()
  let created = await db.saveUser(user)
  delete created.email
  delete created.password

  send(res, 201, created)
})

hash.set('GET /:username', async function getUser (req, res, params) {
  let username = params.username
  await db.connect()
  let user = await db.getUser(username)
  user.avatar = gravatar.url(user.email)

  let images = await db.getImagesByUser(username)
  user.pictures = images

  delete user.email
  delete user.password

  send(res, 200, user)
})

export default async function main (req, res) {
  let { method, url } = req
  let match = hash.get(`${method.toUpperCase()} ${url}`)

  if (match.handler) {
    try {
      await match.handler(req, res, match.params)
    } catch (e) {
      send(res, 500, { error: e.message })
    }
  } else {
    send(res, 404, { error: 'route not found' })
  }
}
