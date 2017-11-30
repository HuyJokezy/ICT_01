let product = require('../../models/product')
let util = require('../../util/index').ultility
let sort = require('./sort')
let paging = require('./paging')

exports.listAllProduct = function (req, res) {
  let callback = function (result) {
    res.render('index', {
      products: result
    })
  }
  product.getAllProducts(callback);
}

exports.listFeaturedProducts = function (req, res) {
  let currentUser
  if (req.headers.cookie) {
    let cookiesObj = util.parseCookies(req.headers.cookie)
    currentUser = cookiesObj.currentUser
  }
  let callback = function (result) {
    res.render('index', {
      products: result,
      currentUser: currentUser
    })
  }
  product.getFeaturedProducts(callback);
}

exports.listSearchProduct = function (req, res) {
  let currentUser
  if (req.headers.cookie) {
    let cookiesObj = util.parseCookies(req.headers.cookie)
    currentUser = cookiesObj.currentUser
  }
  if (req.query.name) {
    let page = -1;
    if (!req.query.page) {
      page = 0
    } else {
      page = req.query.page - 1
    }
    let sortType = req.query.sort
    if (!sortType)
      sortType = ''
    let callback = function (result) {
      let maxPage = paging.getMaxPage(result)
      ///
      const sortEngine = sort.handler
      let sortInstance = sortEngine.getSort(sortType)
      result = sortInstance.execute(result)
      //
      result = paging.paging(page, result)
      //
      res.render('productSearch', {
        products: result,
        currentPage: page + 1,
        maxPage: maxPage,
        name: req.query.name,
        sortType: sortType,
        currentUser: currentUser
      })
    }
    product.getByKeyword(req.query.name, callback);
  } else {
    res.redirect('/')
  }
}
