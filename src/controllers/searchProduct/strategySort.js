function selectionSort(products, direction){
  let result = []
  for (i=0;i<products.length;i++){
    max = products[0][2]
    j = i+1
    current = i
    while (j<products.length){
      if (max < products[j][2]){
        max = products[j][2]
        current = j
      }
      j++
    }
    if (direction === "asc"){
      result.unshift(products[current])
    }
    else {
      result.push(products[current])
    }
  }
  console.log(result)
  return result
}

function defaultSort (products, direction) {
  if (direction === 'asc') {
    return products.sort(function(a, b){
      return parseInt(a[2]) - parseInt(b[2])
    })
  } else {
    return products.sort(function(a, b){
      return parseInt(b[2]) - parseInt(a[2])
    })
  }
}

module.exports = {
  defaultSort,
  selectionSort
}