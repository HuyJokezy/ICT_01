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
			let dataText = util.fixVietnamese(data[1])

			if (dataText.includes(query))
				products.push(data)
		})
		.on('end', () => {
			res.status(200).json(products)
		})
	}
}

exports.product_detail = function (req, res) {
	let id = req.params.id
	let response = product.get_all_products()
	let products = ''
	response
	.on('data', (data) => {
		if (data[0] === id)
			products = data
		})
	.on('end', () => {
		if (products === '') res.redirect('/')
		else
		res.render('product', {
			products: products
		})
	})
}

exports.products_list = function (req, res) {
	if (req.query.name) {
		let name = util.fixVietnamese(req.query.name)
		let response = product.get_all_products()
		let products = []
		response
		.on('data', (data) => {
			products.push(data)
		})
		.on('end', () => {
			let searchResult = []
			products.forEach(function (product) {
				let dataText = util.fixVietnamese(product[1])
				if (dataText.includes(name))
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