let csv = require('fast-csv');
let fs = require('fs');
let util = require('../util/index').ultility;

function saveOrder(order, callback) {
  let result = [];

  csv.fromPath('./src/static/order.csv')
  .on('data', (data) => {
    result.push(data);
  })
  .on('end', () => {
    result.push(order);
    let ws = fs.createWriteStream("./src/static/order.csv");
    csv
    .write(result, {headers: true})
    .pipe(ws);
    util.logging.set('1 order stored successfully')
    util.logging.execute()
    callback();
  }) 
}

module.exports = {
  saveOrder
}
