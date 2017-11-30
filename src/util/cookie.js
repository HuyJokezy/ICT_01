exports.parseCookies = function (reqCookie) {
  let list = {}
  let rc = reqCookie

  rc && rc.split(';').forEach(function(cookie) {
    var parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  return list;
}