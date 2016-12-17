var page = require('page')
var empty = require('empty-element')
var template = require('./template')
var title = require('title')
var request = require('superagent')
var header = require('../header')
var utils = require('../utils')
require('babel-polyfill')

page('/:username', loadUser, utils.loadAuth, header, function (ctx, next) {
  title(`InstaFap - ${ctx.params.username}`)
  var main = document.getElementById('main-container')

  empty(main).appendChild(template(ctx.user))
})

page('/:username/:id', loadUser, utils.loadAuth,  header, function (ctx, next) {
  title(`InstaFap - ${ctx.params.username}`)
  var main = document.getElementById('main-container')
  
  empty(main).appendChild(template(ctx.user))
  $(`#modal-${ctx.params.id}`).openModal({
    complete: function() {
      page(`/${ctx.params.username}`)
    }

  })
})

async function loadUser(ctx, next) {
  try {
    ctx.user = await fetch(`/api/user/${ctx.params.username}`).then((res) => res.json())
    next()
  } catch (err) {
    console.log(err)
  }
}
