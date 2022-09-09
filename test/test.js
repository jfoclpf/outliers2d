/* global describe, it */
const path = require('path')
const assert = require('assert')

const outliers2d = require(path.join('..', 'index.js'))

describe('outliers2d', function () {
  describe('test method ellipseMad', function () {
    const points = [
      [0, 0],
      [0, 1],
      [0.5, 0.5],
      [1, 0],
      [1, 1],
      [5, 5],
      [50, 50]
    ]
    console.log('Points as input for ellipseMad', points)

    const { filteredPoints, outliers, medianPoint } = outliers2d.ellipseMad(points)
    it('should return filteredPoints as an Array with length equal to 5. Points (5,5) and (50, 50) were outliers', function () {
      assert.equal(Array.isArray(filteredPoints) && filteredPoints.length === 5, true)
    })
    it('should return outliers as an Array with 2 points. Points (5,5) and (50, 50) are outliers', function () {
      assert.equal(Array.isArray(outliers) && outliers.length === 2, true)
      assert.equal(Array.isArray(outliers[0]), true)
    })
    it('Points (5,5) and (50, 50) must be the outliers', function () {
      assert.equal(isPointInArray(outliers, [5, 5]), true)
      assert.equal(isPointInArray(outliers, [50, 50]), true)
    })
    it('should return medianPoint as Array with a length of 2 (center point has 2 coordinates)', function () {
      assert.equal(Array.isArray(medianPoint) && medianPoint.length === 2, true)
    })
  })

  describe('test method dbscan', function () {
    const points = [
      [0, 0],
      [0, 1],
      [0.5, 0.5],
      [1, 0],
      [1, 1],
      [5, 5],
      [5, 6],
      [51, 51]
    ]
    console.log('Points as input for dbscan', points)

    describe('default settings', function () {
      const { filteredPoints, outliers } = outliers2d.dbscan(points)
      it('should return filteredPoints as an Array with length equal to 5.', function () {
        assert.equal(Array.isArray(filteredPoints) && filteredPoints.length === 5, true)
      })
      it('outliers are with default settings (5,5), (5,6) and (51, 51).', function () {
        assert.equal(isPointInArray(outliers, [5, 5]), true)
        assert.equal(isPointInArray(outliers, [5, 6]), true)
        assert.equal(isPointInArray(outliers, [51, 51]), true)
      })
    })

    describe('alpha = 2, radius = 3, neighbours = 2', function () {
      const { filteredPoints, outliers } = outliers2d.dbscan(points, 2, 3, 2)
      it('should return filteredPoints as an Array with length equal to 7 when function paramters are 2, 3, 2.', function () {
        assert.equal(Array.isArray(filteredPoints) && filteredPoints.length === 7, true)
      })
      it('outliers are (51, 51).', function () {
        assert.equal(isPointInArray(outliers, [51, 51]), true)
      })
    })
  })
})

function isPointInArray (arr, pt) {
  return arr.some(el => JSON.stringify(el) === JSON.stringify(pt))
}
