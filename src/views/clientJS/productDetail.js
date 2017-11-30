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
