let router = require('express').Router()
let userController = require('../controllers/user/userController')

router.get('/', (req, res) => userController.userInfo(req, res))
router.post('/login', (req, res) => userController.userLogin(req, res))
router.post('/edit', (req, res) => {
  // console.log(req.body)
  userController.editUser(req, res)
})
router.get('*', (req, res) => res.redirect('/'))

module.exports = router
