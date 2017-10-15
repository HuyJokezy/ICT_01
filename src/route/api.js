let router = require('express').Router()
let product = require('../controllers/product')

router.get('/products_suggestion', (req, res) => product.products_suggestion(req, res))

module.exports = router