const outliers2d = require('./index.js')

const points = [
  [0, 0],
  [0, 1],
  [0.5, 0.5],
  [1, 0],
  [1, 1],
  [5, 5]
]

const { filteredPoints, strippedPoints, medianPoint } = outliers2d.ellipseMad(points)

console.log(filteredPoints) // [[0, 0], [0, 1], [0.5, 0.5], [1, 0], [1, 1]]
console.log(strippedPoints) // [[ 5, 5 ]]
console.log(medianPoint) // [ 0.75, 0.75 ]

if (filteredPoints.length && filteredPoints.length) {
  console.log('OK for outliers2d.ellipseMad')
} else {
  process.exit(1)
}

const filteredPoints2 = outliers2d.dbscan(points)
console.log(filteredPoints2)
