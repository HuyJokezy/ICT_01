function addToCart(id, name) {
  let cart = read_cookie('cart')
  let currentUser = read_cookie('currentUser')
  if (currentUser) {
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        console.log(xmlHttp.responseText)
      }
    }
    xmlHttp.open('POST', `/api/addCart?username=${currentUser}&productId=${id}`, true)
    xmlHttp.send()

  } else if (cart) {
    cart = cart.split(',')
    var isNew = true
    cart.forEach((item, index, array) => {
      if (parseInt(item.split(':')[0]) === id) {
        array[index] = `${ item.split(':')[0] }:${ parseInt(item.split(':')[1]) + 1 }`
        isNew = false
      }
    })
    if (isNew) {
      cart.push(`${ id }:1`)
    }
    cart.join(',')
    createCookie('cart', cart)
  } else {
    createCookie('cart', `${ id }:1`)
  }
  alert(`Added ${ name } to cart`)
}

function changeCart(id, value) {
  value = parseInt(value)
  if (value < 0) {
    value = 1
  }
  let cart = read_cookie('cart')
  let currentUser = read_cookie('currentUser')
  if (currentUser) {
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        console.log(xmlHttp.responseText)
        top.location.href = window.location.href
      }
    }
    xmlHttp.open('POST', `/api/changeCart?username=${currentUser}&productId=${id}&value=${value}`, true)
    xmlHttp.send()

  } else {
    cart = cart.split(',')
    cart.forEach((item, index, array) => {
      if (item.split(':')[0] === id) {
        if (value === 0) {
          array.splice(index, 1);
        } else {
          array[index] = `${ item.split(':')[0] }:${ value }`
        }
      }
    })
    cart.join(',')
    createCookie('cart', cart)
    console.log(read_cookie('cart'))
    top.location.href = window.location.href
  }

}

function clearCart() {
  createCookie('cart','1',-1)
  let currentUser = read_cookie('currentUser')
  if (currentUser) {
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.onreadystatechange = function() {
    }
    xmlHttp.open('POST', `./api/clearCart?username=${currentUser}`, true)
    xmlHttp.send()
  }
  top.location.href = '/cart'
}
