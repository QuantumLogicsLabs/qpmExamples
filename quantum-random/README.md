# quantum-random

Random values, ids and passwords for Quantum.

```python
# @use quantum-random

print(Random.integer(1, 6))                      # dice roll
print(Random.pick(["red", "green", "blue"]))
print(Random.shuffle([1, 2, 3, 4, 5]))           # shuffled copy
print(Random.uuid())                             # 3f2b8c1e-9a4d-4f6b-8e2a-1c5d7e9f0a3b
print(Random.password(16))
print(Random.roll("2d6+3"))                      # {"total": 11, "rolls": [4, 4]}

let rng = SeededRandom(42)                       # same seed -> same sequence
print(rng.integer(1, 100), rng.shuffle(["a", "b", "c"]))
```

Globals: `Random`, `SeededRandom`.

## API

Available on both `Random` and `SeededRandom(seed)`:

`next()` → [0, 1) · `integer(lo, hi)` (inclusive) · `decimal(lo, hi)` · `chance(p)` · `pick(arr)` · `weightedPick(items, weights)` · `shuffle(arr)` (Fisher-Yates copy) · `sample(arr, k)` (no repeats) · `token(length, alphabet)` · `color()` → `"#a1b2c3"` · `gaussian(mean, stdDev)` · `roll("NdS±B")` → `{"total", "rolls"}`

`Random` only (cryptographically strong, backed by `secure_random_*`):

`secureInteger(lo, hi)` · `hex(bytes)` · `uuid()` (RFC 4122 v4) · `password(length = 16, options)`. The password always includes at least one character from every enabled class. Options: `{"upper": true, "lower": true, "digits": true, "symbols": true, "exclude": "0O1lI"}`.

`SeededRandom` uses the Park-Miller generator. It's reproducible, so use it for tests, procedural content and games, never for secrets.

## Test

```bat
qpm run test
```
