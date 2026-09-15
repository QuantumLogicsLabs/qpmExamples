# quantum-loops

Loop and iteration helpers for Quantum: counted loops, float ranges, early exit from callback loops, grid loops, safe while-loops, retries and sequence shaping.

```python
# @use quantum-loops

Loop.times(3, fn(i) { print("row", i) })

Loop.each(["a", "b", "stop", "c"], fn(item, i) {
    if item == "stop" { return Loop.BREAK }     # early exit
    print(i, item)
})

print(Loop.range(0, 1, 0.25))                   # [0, 0.25, 0.5, 0.75]
Loop.grid(3, 3, fn(row, col) { print(row, col) })

let result = Loop.retry(fn(attempt) { return connect() }, 5)
if not result["ok"] { print("gave up:", result["error"]) }
```

Global: `Loop`. Callbacks may take fewer parameters than are passed (`fn(item)` works for `each`).

## API

**Counting:** `times(n, f)` → results · `range(end)` / `range(start, end, step)` (fractional and negative steps) · `rangeInclusive(start, end, step)` · `linspace(a, b, count)` · `countdown(start, end, f)` · `grid(rows, cols, f(row, col))`

**Collections:** `each(arr, f(item, i))` · `eachReverse(arr, f)` · `eachKey(dict, f(key, value))` · `eachStep(arr, step, f)` · `mapIndexed(arr, f)` · `filterIndexed(arr, f)`. Return `Loop.BREAK` from `each`, `eachReverse`, `eachKey`, `eachStep`, `grid`, `countdown` or `loopWhile` to stop.

**Conditions:** `loopWhile(cond(i), body(i), max)` · `repeatUntil(body(i) → done, max)` (both raise past `Loop.MAX_ITERATIONS` instead of hanging) · `takeWhile(arr, pred)` · `dropWhile(arr, pred)` · `findIndex(arr, pred)` · `findLastIndex(arr, pred)` · `retry(f(attempt), attempts)` → `{"ok", "value", "attempts", "error"}`

**Shaping:** `enumerate(arr)` · `zip(a, b)` · `unzip(pairs)` · `product(a, b)` · `windows(arr, size)` · `pairs(arr)` · `chunk(arr, size)` · `flatten(arr, depth)` · `cycle(arr, count)` · `interleave(a, b)` · `accumulate(arr, f, initial)`

**Timing:** `benchmark(f, iterations)` → `{"total", "average", "iterations"}` (seconds)

## Test

```bat
qpm run test
```
