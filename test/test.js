/* global describe, it */
const path = require('path')
const assert = require('assert')

const outliers2d = require(path.join('..', 'index.js'))

const points = [
  [0, 0],
  [0, 1],
  [0.5, 0.5],
  [1, 0],
  [1, 1],
  [5, 5]
]

console.log('Points as input', points)

describe('outliers2d', function () {
  describe('reult from ellipseMad', function () {
    const { filteredPoints, strippedPoints, medianPoint } = outliers2d.ellipseMad(points)
    it('should return filteredPoints as an Array with length equal to 5. Point (5,5) was stripped', function () {
      assert.equal(Array.isArray(filteredPoints) && filteredPoints.length === 5, true)
    })
    it('should return strippedPoints as an Array with one point', function () {
      assert.equal(Array.isArray(strippedPoints) && strippedPoints.length === 1, true)
      assert.equal(Array.isArray(strippedPoints[0]), true)
    })
    it('should return medianPoint as Array with a length of 2 (center point has 2 coordinates)', function () {
      assert.equal(Array.isArray(medianPoint) && medianPoint.length === 2, true)
    })
  })

  describe('reult from dbscan', function () {
    const filteredPoints = outliers2d.dbscan(points)
    it('should return filteredPoints as an Array with length equal to 5. Point (5,5) was stripped', function () {
      assert.equal(Array.isArray(filteredPoints) && filteredPoints.length === 5, true)
    })
  })
})
