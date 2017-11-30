let util = require('../../util/index').ultility
let userModel = require('../../models/user')

exports.userInfo = function (req, res) {
  let currentUser
  if (req.headers.cookie) {
    let cookiesObj = util.parseCookies(req.headers.cookie)
    currentUser = cookiesObj.currentUser
    if (currentUser) {
      let callback = function (user) {
        if (user) {
          res.render('userInfo', {
            username: user[0],
            name: user[2],
            phone: user[3],
            address: user[4]
          })
        }
      }
      userModel.getByUsername(currentUser, callback)
    } else {
      res.render('login', {
        error: false
      })
    }
  }
  else {
    res.render('login', {
      error: false
    })
  }
}

exports.userLogin = function (req, res) {
  let { username, password } = req.body
  if (username, password) {
    let callback = function (isUser) {
      if (isUser) {
        res.cookie('currentUser', username)
        res.redirect('/')
      } else {
        res.render('login', {
          error: true
        })
      }
    }
    userModel.verifyUser(username, password, callback)
  } else {
    res.render('login', {
      error: true
    })
  }
}

exports.editUser = function (req, res) {
  let callback = function () {
    res.redirect('/user')
  }
  let currentUser
  let { phone, address, name } = req.body
  if (req.headers.cookie) {
    let cookiesObj = util.parseCookies(req.headers.cookie)
    currentUser = cookiesObj.currentUser
    if (currentUser) {
      userModel.editUser(currentUser, name, phone, address, callback)
    } else {
      callback()
    }
  }
  else {
    callback()
  }
}

exports.addUser = function (req, res) {
  let callback = function (username) {
    res.cookie('currentUser', username)
    res.redirect('/')
  }
  let currentUser
  if (req.headers.cookie) {
    let cookiesObj = util.parseCookies(req.headers.cookie)
    currentUser = cookiesObj.currentUser
    if (currentUser) {
      callback()
    } else {
      userModel.addUser(req.body, callback, res)
    }
  }
  else {
    userModel.addUser(req.body, callback, res)
  }
}

