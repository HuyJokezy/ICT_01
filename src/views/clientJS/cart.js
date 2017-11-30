function createCookie(name,value,days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + value + expires + "; path=/";
    }

    function checkOut() {
      let address = document.getElementById('address').value.trim()
      let recipientName = document.getElementById('recipientName').value.trim()
      console.log(address, recipientName)

      if (address === '' || recipientName === '') {
        alert('Please fill in the information')
        return;
      }
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if(this.responseText === 'success') {
            document.getElementById('checkOutDialogue').style.display='none'
            alert('Thank you for ordering our products\nWe will deliver as soon as possible');
            clearCart();
          } else {
            alert('Sorry for the inconvenience.\nThere are some problems when processing order\nPlease try again later')
          }
        }
      };
      xhttp.open("POST", "/api/checkout", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify([recipientName, address, read_cookie('cart')]));
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

    function clearCart() {
      createCookie('cart','1',-1)
      top.location.href = '/cart'
    }

    function read_cookie(key)
    {
      var result;
      return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
    }

    function changeCart(id, value) {
      value = parseInt(value)
      if (value < 0) {
        value = 1
      }
      let cart = read_cookie('cart')
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
    }
