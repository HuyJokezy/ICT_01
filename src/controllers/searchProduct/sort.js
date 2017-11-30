let strategySort = require('./strategySort')

class sortLowToHigh {
  execute(products){
    if (products.length <= 1) {
      return strategySort.selectionSort(products, 'asc')
    }
    else return strategySort.defaultSort(products, 'asc')
  }
}
//
class sortHighToLow {
  execute(products){
    if (products.length <= 1) {
      return strategySort.selectionSort(products, 'des')
    }
    else return strategySort.defaultSort(products, 'des')
  }
}
//

class sortInvalid {
  execute(products){
    return products
  }
}
class sortFactory {
  getSort(sortRule){
    if (sortRule === "lowPrice"){
      return new sortLowToHigh()
    }
    if (sortRule === "highPrice"){
      return new sortHighToLow()
    }
    return new sortInvalid()
  }
}

// public sorting to be called by controller
module.exports = {
  handler: new sortFactory()
}
