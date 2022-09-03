Remove outliers in a 2D map or cartesian coordinate system using the [Median Absolute Deviation](https://en.wikipedia.org/wiki/Median_absolute_deviation).

## outliers2d(points [, sigma = 3])

```js
const outliers2d = require('outliers2d')

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
```

## Rational

The median absolute deviation (MAD) is a measure of statistical dispersion. Moreover, the MAD is a robust statistic, being more resilient to outliers in a data set than the standard deviation. In the standard deviation, the distances from the mean are squared, so large deviations are weighted more heavily, and thus outliers can heavily influence it. In the MAD, the deviations of a small number of outliers are irrelevant. Because the MAD is a more robust estimator of scale than the sample variance or standard deviation, it works better with distributions without a mean or variance, such as the Cauchy distribution.

This library applies the MAD to three arrays, the arrays of `x`, `y` and `d` coordinates, `d` being the distance of each point to the median point. The default sigma, that is, the threshold from which it is considered an outlier, is 3.