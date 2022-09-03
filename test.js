const outliers2d = require('./index.js')

const points = [
  [0, 0],
  [0, 1],
  [0.5, 0.5],
  [1, 0],
  [1, 1],
  [5, 5]
]

const res = outliers2d(points)

console.log(res.fliteredPoints) // [[0, 0], [0, 1], [0.5, 0.5], [1, 0], [1, 1]]
console.log(res.strippedPoints) // [[ 5, 5 ]]

if (res.fliteredPoints.length && res.fliteredPoints.length) {
  console.log('\nOK')
  process.exit(0)
} else {
  process.exit(1)
}
