let product = require('../models/product')
let util = require('../util/util')

exports.products_suggestion = function (req, res) {
	if (req.query.query === '') res.status(200).json([])
	else {
		let response = product.get_all_products()
		let products = []
		response
		.on('data', (data) => {
			let query = util.fixVietnamese(req.query.query)
			let dataText = util.fixVietnamese(data[0])

			if (dataText.includes(query))
				products.push(data)
		})
		.on('end', () => {
			res.status(200).json(products)
		})
	}
}

exports.products_list = function (req, res) {
	let query = req.query
	if (query.name) {
		let response = product.get_all_products()
		let products = []
		response
		.on('data', (data) => {
			products.push(data)
		})
		.on('end', () => {
			let searchResult = []
			products.forEach(function (product) {
				if (product[0].toLowerCase() === query.name.toLowerCase())
					searchResult.push(product)
			})
			if (searchResult.length === 0) searchResult = products
			res.render('index', {
				products: searchResult
			})
		})
	} else {
		let response = product.get_all_products()
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
}