let router = require('express').Router()
let userController = require('../controllers/user/userController')

router.get('/signup', (req, res) => {
  let currentUser
  if (req.headers.cookie) {
    let cookiesObj = util.parseCookies(req.headers.cookie)
    currentUser = cookiesObj.currentUser
    if (currentUser) {
      res.redirect('/user')
    } else {
      res.render('signup', {
        error: false
      })
    }
  }
  else {
    res.render('signup', {
      error: false
    })
  }
})
router.get('/', (req, res) => userController.userInfo(req, res))
router.post('/signup', (req, res) => {
  userController.addUser(req, res)
})
router.post('/login', (req, res) => userController.userLogin(req, res))
router.post('/edit', (req, res) => {
  // console.log(req.body)
  userController.editUser(req, res)
})
router.get('*', (req, res) => res.redirect('/'))

module.exports = router
