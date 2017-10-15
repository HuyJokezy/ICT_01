let router = require('express').Router()
let product = require('../controllers/product')
router.get('/', (req, res) => product.products_list(req, res))

module.exports = router