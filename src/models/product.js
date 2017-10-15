let csv = require('fast-csv')

exports.get_all_products = function () {
	return csv.fromPath('./src/static/db.csv')
}



