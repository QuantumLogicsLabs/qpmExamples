# quantum-math

Math toolkit for Quantum: statistics, number theory, combinatorics, matrices, geometry and finance.

```python
# @use quantum-math

print(QMath.mean([2, 4, 9]))                 # 5
print(QMath.primesUpTo(20))                  # [2, 3, 5, 7, 11, 13, 17, 19]
print(QMath.toRoman(2026))                   # MMXXVI
print(QMath.inverse([[4, 7], [2, 6]]))       # [[0.6, -0.7], [-0.2, 0.4]]
print(QMath.loanPayment(200000, 0.06, 360))  # 1199.10...
```

Global: `QMath` (the native `Math` is left alone). See [the package list](../README-SA-PACKAGES.md) for how to bundle.

## API

**Basics:** `clamp(x, lo, hi)` · `lerp(a, b, t)` · `mapRange(x, inMin, inMax, outMin, outMax)` · `roundTo(x, decimals)` · `sign(x)` · `trunc(x)` · `mod(a, n)` (always positive) · `isInteger(x)` · `isEven(n)` · `isOdd(n)` · `approxEqual(a, b, eps)` · `degToRad(d)` · `radToDeg(r)` · `hypot(a, b)` · `percentOf(part, whole)` · `percentChange(old, new)`

**Number theory:** `factorial(n)` · `fibonacci(n)` · `fibonacciSequence(n)` · `isPrime(n)` · `primesUpTo(n)` · `primeFactors(n)` · `divisors(n)` · `gcd(a, b)` · `lcm(a, b)` · `gcdOf(list)` · `lcmOf(list)` · `isPerfect(n)` · `digits(n)` · `digitSum(n)` · `isArmstrong(n)` · `toBase(n, base)` · `fromBase(text, base)` · `toRoman(n)` · `fromRoman(text)`

**Combinatorics:** `nCr(n, k)` · `nPr(n, k)` · `permutations(arr)` · `combinations(arr, k)` · `powerSet(arr)`

**Statistics:** `sum` · `mean` · `median` · `mode` (array of most frequent) · `variance(values, sample)` · `stdDev(values, sample)` · `minOf` · `maxOf` · `percentile(values, p)` · `weightedMean(values, weights)` · `cumulativeSum` · `normalize` (to 0..1) · `correlation(xs, ys)` · `linearRegression(xs, ys)` → `{"slope", "intercept"}`

**Vectors & matrices:** `dot` · `magnitude` · `distance` · `matrix(rows, cols, fill)` · `identity(n)` · `transpose` · `addMatrices` · `scaleMatrix(m, k)` · `multiply(a, b)` · `determinant(m)` · `inverse(m)` (raises if singular)

**Geometry & finance:** `circleArea(r)` · `circleCircumference(r)` · `triangleArea(a, b, c)` · `compoundInterest(principal, rate, years, timesPerYear)` · `loanPayment(principal, annualRate, months)`

## Test

```bat
qpm run test
```
