const { square, median, mad } = require('mathjs')
const clustering = require('density-clustering')

// error ellipse based on the Median Absolute Deviation.
module.exports = { ellipseMad, dbscan }

// points should be in format, f.ex: [[1,2],[3,4],[5,6],..]
function ellipseMad (points, _sigma) {
  const sigma = _sigma || 3.5
  const medianPoint = [median(points.map(p => p[0])), median(points.map(p => p[1]))]

  // remove outliers with Median Absolute Deviation (MAD)
  const madValue = [mad(points.map(p => p[0])), mad(points.map(p => p[1]))]

  const outliers = []
  const filteredPoints = points.filter(pt => {
    if (
      square(pt[0] - medianPoint[0]) / square(sigma * madValue[0]) +
      square(pt[1] - medianPoint[1]) / square(sigma * madValue[1]) < 1
    ) {
      return true
    } else {
      outliers.push(pt)
      return false
    }
  })
  return { filteredPoints, outliers, medianPoint }
}

// alpha: minimum number of points for cluster NOT to be considered as outlier
// radius: distance between points to be considered in the same cluster
// neighbours: minimum number of neighbours around one point to be considered a cluster
function dbscan (points, alpha, radius, neighbours) {
  const _alpha = alpha || 5
  const _radius = radius || 2
  const _neighbours = neighbours || 5

  const dbscan = new clustering.DBSCAN()

  // result clusters has only the indexes of pointsArr
  // see https://www.npmjs.com/package/density-clustering#dbscan-1
  const clusters = dbscan.run(points, _radius, _neighbours)
  clusters.sort((a, b) => b.length - a.length) // sort clusters by size

  // if a cluster has more than "alpha" points, add it to the results
  const filteredPoints = []
  clusters.forEach(cluster => {
    if (cluster.length >= _alpha) {
      cluster.forEach(i => filteredPoints.push(points[i]))
    }
  })

  // subtract filteredPoints from points to get outliers
  const outliers = points.filter(n => !isPointInArray(filteredPoints, n))

  return { filteredPoints, outliers }
}

function isPointInArray (arr, pt) {
  return arr.some(el => JSON.stringify(el) === JSON.stringify(pt))
}
