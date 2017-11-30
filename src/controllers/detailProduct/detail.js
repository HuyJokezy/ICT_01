let product = require('../../models/product')
let util = require('../../util/index').ultility

exports.productDetail = function (req, res) {
  let id = req.params.id
  let currentUser
  if (req.headers.cookie) {
    let cookiesObj = util.parseCookies(req.headers.cookie)
    currentUser = cookiesObj.currentUser
  }
  let callback = function (result) {
    // console.log(result)
    if (result.length === 0) {
      res.redirect('/')
    } else {
      res.render('productDetail', {
        products: result[0],
        currentUser: currentUser
      })
    }
  }
  product.getById(id, callback)
}
