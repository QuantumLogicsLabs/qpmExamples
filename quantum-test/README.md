# quantum-test

A small unit-testing framework for Quantum.

```python
# @use quantum-test
# @use ../index.sa

describe("cart", fn() {
    it("totals items", fn() {
        expect(total([2, 3])).toBe(5)
        expect([1, {"a": [2]}]).toEqual([1, {"a": [2]}])
        expectNot("abc").toContain("z")
        expect(fn() { total(null) }).toThrow()
    })
})

Test.report()     # prints a summary; raises (exit code 1) if anything failed
```

Globals: `describe`, `it`, `expect`, `expectNot`, `Test`.

## Matchers

`toBe` / `toEqual` (deep equality for arrays and dicts) · `toBeTruthy` · `toBeFalsy` · `toBeNull` · `toBeGreaterThan(n)` · `toBeLessThan(n)` · `toBeCloseTo(n, digits = 6)` · `toContain(item)` (strings, arrays, dict keys) · `toHaveLength(n)` · `toBeType("dict")` · `toThrow()` (for a zero-argument function)

`expectNot(value)` negates any matcher.

## Behaviour

- All failed expectations in a test are listed, not only the first.
- A runtime error inside `it` fails that test and the run continues.
- `Test.report(false)` returns `true`/`false` instead of raising.
- `Test.color = false` disables ANSI colors.
- Failures are recorded rather than raised internally. The current VM doesn't close captured variables when an exception unwinds, so raising would leak state into later tests.
