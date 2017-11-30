let router = require('express').Router()
let suggest = require('../controllers/searchProduct/suggestProduct')
let order = require('../controllers/orderController')
let user = require('../models/user')
let path = require('path');

router.get('/productSuggestion', (req, res) => suggest.products_suggestion(req, res))
router.post('/checkOut', (req, res) => order.createOrder(req, res))
router.post('/clearCart', (req, res) => user.clearCart(req, res))
router.post('/addCart', (req, res) => {
  user.addCart(req, res)
})
router.post('/changeCart', (req, res) => {
  user.changeCart(req, res)
})
router.get('/clientJS/:file', (req, res) => {
  if (req.params.file) {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(path.join(__dirname + '/../views/clientJS/' + req.params.file + '.js'))
  }
})

module.exports = router
