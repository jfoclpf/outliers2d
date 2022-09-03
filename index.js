const { square, median, mad } = require('mathjs')

// points should be in format, f.ex: [[1,2],[3,4],[5,6],..]
function outliers2D (points, _sigma) {
  const sigma = _sigma || 3.5
  const medianPoint = [median(points.map(p => p[0])), median(points.map(p => p[1]))]

  // remove outliers with Median Absolute Deviation (MAD)
  const madValue = [mad(points.map(p => p[0])), mad(points.map(p => p[1]))]

  const strippedPoints = []
  const filteredPoints = points.filter(pt => {
    if (
      square(pt[0] - medianPoint[0]) / square(sigma * madValue[0]) +
      square(pt[1] - medianPoint[1]) / square(sigma * madValue[1]) < 1
    ) {
      return true
    } else {
      strippedPoints.push(pt)
      return false
    }
  })
  return { filteredPoints, strippedPoints, medianPoint }
}

module.exports = outliers2D
