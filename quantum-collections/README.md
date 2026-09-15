# quantum-collections

Data structures and collection utilities for Quantum.

```python
# @use quantum-collections

let tasks = PriorityQueue(fn(a, b) { return b["priority"] - a["priority"] })
tasks.push({"name": "deploy", "priority": 10})
print(tasks.pop()["name"])

let cache = LRUCache(100)
cache.set("user:1", {"name": "Ada"})

let byRole = Collections.groupBy(users, fn(u) { return u["role"] })
let oldestFirst = Collections.sortBy(users, fn(u) { return u["age"] }, true)
let port = Collections.getPath(config, "db.primary.port", 5432)
```

Globals: `Stack`, `Queue`, `Deque`, `UniqueSet`, `PriorityQueue`, `LRUCache`, `Counter`, `Collections`.

## Data structures

| Class | Methods |
|---|---|
| `Stack(items?)` | `push` (chainable) · `pop` · `peek` · `size` · `isEmpty` · `clear` · `toArray` |
| `Queue(items?)` | `enqueue` · `dequeue` (amortized O(1)) · `peek` · `size` · `isEmpty` · `clear` · `toArray` |
| `Deque(items?)` | `pushFront` · `pushBack` · `popFront` · `popBack` · `peekFront` · `peekBack` · `size` · `isEmpty` · `toArray` |
| `UniqueSet(items?)` | `add` · `has` · `remove` · `size` · `isEmpty` · `values` · `union` · `intersection` · `difference` · `isSubsetOf`. `1` and `"1"` are distinct. Named to avoid the native `Set`. |
| `PriorityQueue(compare?)` | binary heap; `compare(a, b) < 0` pops `a` first (default: smallest number). `push` · `pop` · `peek` · `size` · `isEmpty` · `toSortedArray` |
| `LRUCache(capacity)` | `get(key, fallback)` · `set` · `has` · `remove` · `size` · `keys` (least → most recent) · `clear` |
| `Counter(items?)` | `add(item, n)` · `get` · `total` · `mostCommon(n)` → `[[item, count], ...]` |

Empty `pop`/`dequeue`/`peek` return `null` instead of raising.

## Collections

**Sorting:** `sortWith(arr, compare)` (stable merge sort; the native `sort` ignores comparators) · `sortBy(arr, keyFn, descending)` · `compareValues(a, b)` · `binarySearch(sortedArr, target)`

**Grouping:** `groupBy` · `countBy` · `keyBy` · `partition(arr, pred)` → `[yes, no]`

**Arrays:** `unique` · `uniqueBy` · `sumBy` · `minBy` · `maxBy` · `pluck(records, key)` · `compact` (drops null/false) · `intersect` · `difference` · `union`

**Dicts:** `pick(d, keys)` · `omit(d, keys)` · `invert` · `fromPairs` · `zipObject(keys, values)` · `getPath(value, "a.b.0.c", fallback)` · `setPath(d, "a.b", value)` · `deepClone` · `deepMerge(a, b)`

## Test

```bat
qpm run test
```
