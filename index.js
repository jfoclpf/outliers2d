const math = require('mathjs')

// points should ne in format, f.ex: [[1,2],[3,4],[5,6],..]
function outliers2D (points, _sigma) {
  const sigma = _sigma || 3
  const medianPoint = [math.median(points.map(p => p[0])), math.median(points.map(p => p[1]))]

  // remove outliers with Median Absolute Deviation (MAD)
  const madValue = [math.mad(points.map(p => p[0])), math.mad(points.map(p => p[1]))]
  const mad2d = math.sqrt(math.square(madValue[0]) + math.square(madValue[1]))

  const strippedPoints = []
  const fliteredPoints = points.filter(pt => {
    if (
      (pt[0] - medianPoint[0] < sigma * madValue[0]) &&
      (pt[1] - medianPoint[1] < sigma * madValue[1]) &&
      (math.sqrt(math.square(pt[0] - medianPoint[0]) + math.square(pt[1] - medianPoint[1])) < sigma * mad2d)
    ) {
      return true
    } else {
      strippedPoints.push(pt)
      return false
    }
  })
  // console.log(fliteredPoints)
  return { fliteredPoints, strippedPoints }
}

module.exports = outliers2D
