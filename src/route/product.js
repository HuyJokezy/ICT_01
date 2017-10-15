let router = require('express').Router()
let product = require('../controllers/product')

router.get('/:id', (req, res) => product.product_detail(req, res))
router.get('/', (req, res) => { 
	res.redirect('/')
})

module.exports = router