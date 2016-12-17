var yo = require('yo-yo')
var layout = require('../layout')
var translate = require('../translate')

module.exports = function userPageTemplate(user) {
  var el = yo`<div class="container user-page">
  <div class="row valign-wrapper">
    <div class="col s6 m5 l5 left">
    <img src="${user.avatar}" class="circle s4 m4 l4 profile-avatar"/>
    </div>
    <div class="col s6 m6 l6 right">
    <span class="profile-username valign">${user.name}</span>
    </div>
  </div>
  <div class="row">
    <div class="col">
    ${user.pictures.map(function(picture) {
      return yo`<div class="col s12 m6 l4">
    <div class="s12 m6 l4">
      <a class="userpics modal-trigger" href="/${user.username}/${picture.id}"><img class="activator userpics" src="${picture.src}" id="${picture.id}"/></a>
      <div class="s12 m6 l4 user-likes">
        <i class="fa fa-heart left" aria-hidden="true" id="${picture.id}"></i>
        <span class="left likes">${picture.likes || 0}</span>
      </div>
    </div>
  <div id="modal-${picture.id}" class="modal">
    <div class="row">
      <div class="col s12 m8 l8">
      <img class="modal-image" src="${picture.src}" id="${picture.id}"/>
      </div>
      <div class="col modal-text s12 m3 l3">
      <h2 class="modal-title">Picture ${picture.id}</h2>
      <img src="${user.avatar}" class="circle s4 m4 l4 avatar"/>
      <span class="valign profile-username">${user.name}</span>
      <p><i class="fa fa-heart left modal-likes" aria-hidden="true" id="${picture.id}"></i><span class="likes left valign">${picture.likes || 0}</span></p>
      </div>
    </div>
  </div>
  </div>`
      })}
    </div>
  </div>
</div>`


  return layout(el)
}

/* 
/user/picture/id 
*/

  