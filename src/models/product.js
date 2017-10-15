let csv = require('fast-csv')

exports.getAllProducts = function () {
	let products = []
	return csv.fromPath('./src/static/db.csv')
}