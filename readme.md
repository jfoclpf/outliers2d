Remove outliers in a 2D map or cartesian coordinate system using an error ellipse based on the [Median Absolute Deviation](https://en.wikipedia.org/wiki/Median_absolute_deviation).

![image](https://user-images.githubusercontent.com/3984909/188286763-21dbf76d-3968-4618-9f8c-83a7e3cbee13.png)

## outliers2d(points [, sigma = 3.5])

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

const { filteredPoints, strippedPoints, medianPoint } = outliers2d(points)

console.log(filteredPoints) // [[0, 0], [0, 1], [0.5, 0.5], [1, 0], [1, 1]]
console.log(strippedPoints) // [[ 5, 5 ]]
console.log(medianPoint) // [ 0.75, 0.75 ]
```

## Rational

This library applies the median absolute deviation (MAD) to plot an ellipse whose center is the median point of the coordinates and the semi-axes are the median deviations along the x and y coordinates. The ellipse is then linearly scaled by sigma. If a point is outside this ellipse, it is considered an outlier.

The median absolute deviation (MAD) is a measure of statistical dispersion. Moreover, the MAD is a robust statistic, being more resilient to outliers in a data set than the standard deviation. In the standard deviation, the distances from the mean are squared, so large deviations are weighted more heavily, and thus outliers can heavily influence it. In the MAD, the deviations of a small number of outliers are irrelevant. Because the MAD is a more robust estimator of scale than the sample variance or standard deviation, it works better with distributions without a mean or variance, such as the Cauchy distribution.
