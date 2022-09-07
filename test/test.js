/* global describe, it */
const path = require('path')
const assert = require('assert')

const outliers2d = require(path.join('..', 'index.js'))

describe('outliers2d', function () {
  describe('reult from ellipseMad', function () {
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

    const { filteredPoints, strippedPoints, medianPoint } = outliers2d.ellipseMad(points)
    it('should return filteredPoints as an Array with length equal to 5. Points (5,5) and (50, 50) were stripped', function () {
      assert.equal(Array.isArray(filteredPoints) && filteredPoints.length === 5, true)
    })
    it('should return strippedPoints as an Array with 2 points. Points (5,5) and (50, 50) are outliers', function () {
      assert.equal(Array.isArray(strippedPoints) && strippedPoints.length === 2, true)
      assert.equal(Array.isArray(strippedPoints[0]), true)
    })
    it('should return medianPoint as Array with a length of 2 (center point has 2 coordinates)', function () {
      assert.equal(Array.isArray(medianPoint) && medianPoint.length === 2, true)
    })
  })

  describe('reult from dbscan', function () {
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

    const filteredPoints = outliers2d.dbscan(points)
    it('should return filteredPoints as an Array with length equal to 5.', function () {
      assert.equal(Array.isArray(filteredPoints) && filteredPoints.length === 5, true)
    })

    const filteredPoints2 = outliers2d.dbscan(points, 2, 3, 2)
    it('should return filteredPoints as an Array with length equal to 7 when function paramters are 2, 3, 2.', function () {
      assert.equal(Array.isArray(filteredPoints2) && filteredPoints2.length === 7, true)
    })
  })
})
