[![Node.js CI](https://github.com/jfoclpf/outliers2d/actions/workflows/node.js.yml/badge.svg)](https://github.com/jfoclpf/outliers2d/actions/workflows/node.js.yml)
[![CodeQL Security Check](https://github.com/jfoclpf/outliers2d/actions/workflows/codeql.yml/badge.svg)](https://github.com/jfoclpf/outliers2d/actions/workflows/codeql.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://standardjs.com/)
[![Known Vulnerabilities](https://snyk.io/test/github/jfoclpf/outliers2d/badge.svg)](https://snyk.io/test/github/jfoclpf/outliers2d)


Removes outliers in a 2D map or cartesian coordinate system.

It may use:

- an error ellipse based on the [Median Absolute Deviation](https://en.wikipedia.org/wiki/Median_absolute_deviation),
- [DBSCAN](https://en.wikipedia.org/wiki/DBSCAN) considering the main cluster as the cluster with more points

#### Median Absolute Deviation error ellipse
![image](https://user-images.githubusercontent.com/3984909/188286763-21dbf76d-3968-4618-9f8c-83a7e3cbee13.png)

#### DBSCAN (alpha = 10, radius = 0.008, neighbours = 3)
![image](https://user-images.githubusercontent.com/3984909/189483575-92710926-7dc0-462d-abd5-c040ff23342a.png)



## ellipseMad(points [, sigma = 3.5])

 - **sigma**: the linear scale to apply to the ellipse whose center axes are defined by the median. Default is 3.5.

```js
const { ellipseMad } = require('outliers2d')

const points = [
  [0, 0], [0, 1], [0.5, 0.5], [1, 0], [1, 1], [5, 5]
]

const { filteredPoints, outliers, medianPoint } = ellipseMad(points)

console.log(filteredPoints) // [[0, 0], [0, 1], [0.5, 0.5], [1, 0], [1, 1]]
console.log(outliers) // [[ 5, 5 ]]
console.log(medianPoint) // [ 0.75, 0.75 ]
```

## dbscan(points [, alpha = 5, radius = 2, neighbours = 5])

 - **alpha**: minimum number of points for cluster NOT to be considered as outlier. Default is 5.
 - **radius**: distance between points to be considered in the same cluster. Default is 2.
 - **neighbours**: minimum number of neighbours to be considered a cluster. Default is 5.

```js
const { dbscan } = require('outliers2d')

const points = [
  [0, 0], [0, 1], [0.5, 0.5], [1, 0], [1, 1], [5, 5], [5, 6], [51, 51]
]

const res = dbscan(points)
console.log(res.filteredPoints, res.outliers)
// [[0, 0], [0, 1], [0.5, 0.5], [1, 0], [1, 1]]
// [[5, 5], [5, 6], [51, 51]]

const res2 = dbscan(points, 2, 3, 2)
console.log(res2.filteredPoints, res2.outliers)
// [[0, 0], [0, 1], [0.5, 0.5], [1, 0], [1, 1], [5, 5], [5, 6]]
// [[51, 51]]
```

## Rational
#### Median Absolute Deviation error ellipse

This library may apply the median absolute deviation (MAD) to plot an ellipse whose center is the median point of the coordinates and the semi-axes are the median deviations along the x and y coordinates. The ellipse is then linearly scaled by sigma. If a point is outside this ellipse, it is considered an outlier.

The median absolute deviation (MAD) is a measure of statistical dispersion. Moreover, the MAD is a robust statistic, being more resilient to outliers in a data set than the standard deviation. In the standard deviation, the distances from the mean are squared, so large deviations are weighted more heavily, and thus outliers can heavily influence it. In the MAD, the deviations of a small number of outliers are irrelevant. Because the MAD is a more robust estimator of scale than the sample variance or standard deviation, it works better with distributions without a mean or variance, such as the Cauchy distribution.

#### DBSCAN

Density-based spatial clustering of applications with noise (DBSCAN) is a data clustering algorithm. For the purpose of outlier detection the present function considers that the main cluster is the cluster with the highest number of points, and then neglects outer isolated points with no clusters or minor clusters with not enough points.
