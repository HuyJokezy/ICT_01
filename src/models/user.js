let csv = require('fast-csv');
let fs = require('fs');
let util = require('../util/index').ultility;

function verifyUser (username, password, callback) {
  let result = [];

  csv.fromPath('./src/static/user.csv')
  .on('data', (data) => {
    result.push(data);
  })
  .on('end', () => {
    let index = result.findIndex((acc) => {
      return acc[0] === username && acc[1] === password
    })
    let isUser = false
    if (index !== -1) {
      isUser = true
    }
    callback(isUser);
  })
}

function getByUsername (username, callback) {
  let result = [];

  csv.fromPath('./src/static/user.csv')
  .on('data', (data) => {
    result.push(data);
  })
  .on('end', () => {
    let user = result.find((acc) => {
      return acc[0] === username
    })
    callback(user);
  })
}

function editUser (username, name, phone, address, callback) {
  let result = [];
  // console.log(username, name, phone, address)
  csv.fromPath('./src/static/user.csv')
  .on('data', (data) => {
    result.push(data);
  })
  .on('end', () => {
    let user = result.forEach((acc, index, array) => {
      array[index][5] = acc[5]
      if (acc[0] === username) {
        array[index] = [acc[0], acc[1], name, phone, address, acc[5]]
      }
    })
    reWrite(result)
    callback();
  })
}

function reWrite(result) {
  let ws = fs.createWriteStream("./src/static/user.csv");
  csv
  .write(result, {headers: true})
  .pipe(ws);
}

function getCart (username, callback) {
  let result = [];
  csv.fromPath('./src/static/user.csv')
  .on('data', (data) => {
    result.push(data);
  })
  .on('end', () => {
    let index = result.findIndex((acc) => {
      return acc[0] === username
    })
    if (index !== -1) {
      let productsList = []
      if (result[index][5] !== 'empty') {
        productsList = result[index][5].split(',').map((item) => {
          return {
            id: item.split(':')[0],
            qty: item.split(':')[1]
          }
        })
      }
      callback(productsList)
    } else {
      callback([])
    }
  })
}

function clearCart (req, res) {
  let username = req.query.username
  if (username) {
    let result = [];
    csv.fromPath('./src/static/user.csv')
    .on('data', (data) => {
      result.push(data);
    })
    .on('end', () => {
      let user = result.forEach((acc, index, array) => {
        array[index][5] = acc[5]
        if (acc[0] === username) {
          array[index][5] = "empty"
        }
      })
      reWrite(result)
      res.send('ok')
    })
  } else {
    res.send('ok')
  }
}

function addCart (req, res) {
  let username = req.query.username
  let productId = req.query.productId
  if (username && productId) {
    let result = [];
    csv.fromPath('./src/static/user.csv')
    .on('data', (data) => {
      result.push(data);
    })
    .on('end', () => {
      let user = result.forEach((acc, index, array) => {
        if (acc[0] === username) {
          let cart = []
          if (array[index][5] !== 'empty') {
            cart = array[index][5].split(',')
          }
          var isNew = true
          cart.forEach((item, index, array) => {
            if (item.split(':')[0] === productId) {
              array[index] = `${ item.split(':')[0] }:${ parseInt(item.split(':')[1]) + 1 }`
              isNew = false
            }
          })
          if (isNew) {
            cart.push(`${ productId }:1`)
          }
          // console.log(cart)
          array[index][5] = cart.join(',')
        }
      })
      reWrite(result)
      res.send('ok')
    })
  } else {
    res.send('not ok')
  }
}

function changeCart (req, res) {
  let username = req.query.username
  let productId = req.query.productId
  let value = req.query.value

  if (username && productId) {
    let result = [];
    csv.fromPath('./src/static/user.csv')
    .on('data', (data) => {
      result.push(data);
    })
    .on('end', () => {
      let user = result.forEach((acc, index, array) => {
        if (acc[0] === username) {
          let cart = []
          if (array[index][5] !== 'empty') {
            cart = array[index][5].split(',')
          }
          cart.forEach((item, index, array) => {
            if (item.split(':')[0] === productId) {
              if (value === 0) {
                array.splice(index, 1);
              } else {
                array[index] = `${ item.split(':')[0] }:${ value }`
              }
            }
          })
          // console.log(cart)
          array[index][5] = cart.join(',')
        }
      })
      reWrite(result)
      res.send('ok')
    })
  } else {
    res.send('not ok')
  }
}

module.exports = {
  verifyUser,
  getByUsername,
  editUser,
  getCart,
  clearCart,
  addCart,
  changeCart
}
