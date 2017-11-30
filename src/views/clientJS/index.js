function recommend(value){
  document.getElementById(`searchSuggest1`).innerHTML = ''
  document.getElementById(`searchSuggest2`).innerHTML = ''
  document.getElementById(`searchSuggest3`).innerHTML = ''
  document.getElementById(`searchSuggest4`).innerHTML = ''
  document.getElementById(`searchSuggest5`).innerHTML = ''

  var xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      console.log(xmlHttp.responseText)
      let values = JSON.parse(xmlHttp.responseText)
      for (let i = 0; i < 5; i++) {
        if (values[i]) {
          document.getElementById(`searchSuggest${ i + 1 }`).style = "text-decoration: none !important;"
          document.getElementById(`searchSuggest${ i + 1 }`).href = `/product/${ values[i][0] }`
          document.getElementById(`searchSuggest${ i + 1 }`).innerHTML = values[i][1]
        }
      }
    }
  }
  xmlHttp.open('GET', `./api/productSuggestion?query=${ value }`, true)
  xmlHttp.send()
}
function addToCart(id, name) {
  let cart = read_cookie('cart')
  if (cart) {
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
  console.log(read_cookie('cart'))
  alert(`Added ${ name } to cart`)
}
function createCookie(name,value,days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}
function read_cookie(key)
{
  var result;
  return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
}
