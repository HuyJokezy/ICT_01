let product = require('../models/product')

exports.products_list = function (req, res) {
	let query = req.query
	if (query.name) {
		console.log(query.name)
	} else {
	}
	let response = product.getAllProducts()
	let products = []
	response
	.on('data', (data) => {
		products.push(data)
	})
	.on('end', () => {
		res.render('index', {
			products: products
		})
	})
}