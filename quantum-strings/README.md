# quantum-strings

Everyday string helpers for Quantum.

```python
# @use quantum-strings

print(Strings.camelCase("user account id"))            # userAccountId
print(Strings.slugify("Hello, World! It's Quantum"))   # hello-world-its-quantum
print(Strings.template("Hi {{name}}", {"name": "Ada"}))
print(Strings.truncate("The quick brown fox", 12))     # The quick...
print(Strings.formatNumber(1234567.891, 2))            # 1,234,567.89
print(Strings.closest("instal", ["init", "install"]))  # install
```

Global: `Strings`.

## API

**Words & case:** `words(s)` (splits on punctuation and camelCase/acronym/digit boundaries) · `capitalize` · `camelCase` · `pascalCase` · `snakeCase` · `kebabCase` · `constantCase` · `titleCase` · `slugify` · `initials(name)`

**Shaping:** `truncate(s, maxLen, suffix)` · `padLeft(s, width, ch)` · `padRight(s, width, ch)` · `center(s, width, ch)` · `wrap(text, width)` · `indent(text, spaces)` · `reverse(s)` · `mask(s, visible, ch)`

**Inspection:** `isBlank(s)` · `isPalindrome(s)` · `count(s, sub)` (non-overlapping) · `between(s, start, end)` · `compare(a, b)` → -1/0/1 (Quantum's `<` does not compare strings) · `similarity(a, b)` → 0..1 · `closest(input, candidates)`

**Formatting:** `template(tpl, data)` (`{{key}}` or `{{ key }}`) · `escapeHtml` · `unescapeHtml` · `pluralize(n, singular, plural)` · `ordinal(n)` · `formatNumber(n, decimals, sep)` · `formatBytes(bytes)`

## Test

```bat
qpm run test
```
