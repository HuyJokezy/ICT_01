let product = require('../../models/product')
let util = require('../../util/index').ultility
let userModel = require('../../models/user')

exports.showCart = function (req, res) {
  let productsList = [];
  let currentUser
  if (req.headers.cookie) {
    let cookiesObj = util.parseCookies(req.headers.cookie)
    currentUser = cookiesObj.currentUser
    let cart = cookiesObj.cart
    if (currentUser) {
      let callback = function (productsList) {
        let productsIdList = productsList.map((item) => {
          return item.id
        })
        let callbackExtra = function (result) {
          result.forEach((item, index, array) => {
            let qty = productsList.find((product) => {
              return product.id === item[0]
            }).qty
            array[index][3] = qty
          })
          res.render('cart', {
            products: result,
            currentUser
          })
        }
        product.getByIdList(productsIdList, callbackExtra);
      }
      userModel.getCart(currentUser, callback);
    } else if (cookiesObj.cart) {
      productsList = cookiesObj.cart.split(',').map((item) => {
        return {
          id: item.split(':')[0],
          qty: item.split(':')[1]
        }
      })
      let productsIdList = productsList.map((item) => {
        return item.id
      })
      let callback = function (result) {
        result.forEach((item, index, array) => {
          let qty = productsList.find((product) => {
            return product.id === item[0]
          }).qty
          array[index][3] = qty
        })
        res.render('cart', {
          products: result,
          currentUser
        })
      }
      product.getByIdList(productsIdList, callback);
    }
  } else {
    res.render('cart', {
      products: [],
      currentUser
    })
  }
}
