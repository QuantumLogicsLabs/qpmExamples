# Quantum `.sa` packages

Reusable Quantum Language libraries, packaged for qpm. Each one is a folder with a
`package.json` (`"main": "index.sa"`), the library, a README and a test suite.

| Package | Global(s) | What it gives you |
|---|---|---|
| [quantum-math](quantum-math) | `QMath` | stats, primes, gcd/lcm, bases, roman numerals, combinatorics, matrices, finance |
| [quantum-loops](quantum-loops) | `Loop` | `times`, float ranges, `each` with `Loop.BREAK`, grid loops, `retry`, `zip`, `windows`, `chunk` |
| [quantum-strings](quantum-strings) | `Strings` | case conversion, slugify, truncate, wrap, templates, HTML escaping, number formatting |
| [quantum-collections](quantum-collections) | `Stack` `Queue` `Deque` `UniqueSet` `PriorityQueue` `LRUCache` `Counter` `Collections` | data structures, stable `sortBy`, `groupBy`, deep get/set/merge |
| [quantum-validate](quantum-validate) | `Validate` | email/URL/IP/phone/card/date checks, password strength, schema validation |
| [quantum-datetime](quantum-datetime) | `DateTime` | ISO parsing, formatting tokens, month math, diffs, relative times |
| [quantum-csv](quantum-csv) | `CSV` | robust CSV parse/stringify, files |
| [quantum-random](quantum-random) | `Random` `SeededRandom` | ranged ints, shuffle, UUID v4, passwords, dice, seeded RNG |
| [quantum-term](quantum-term) | `Term` `Logger` `Log` | colors, tables, boxes, progress bars, trees, leveled logger |
| [quantum-events](quantum-events) | `EventEmitter` `Store` `StateMachine` | pub/sub, Redux-style store, state machines |
| [quantum-test](quantum-test) | `describe` `it` `expect` | unit testing (used by every package's tests) |
| [quantum-bundle](quantum-bundle) | `Bundler` | makes packages usable today (see below) |

[qpm-test-sa](qpm-test-sa) is a demo project that uses nine of them together to
turn a CSV into a terminal sales report.

## Using packages in a project

Quantum does not load modules at runtime yet (`import` parses but compiles to
nothing), so packages are combined ahead of time by **quantum-bundle**:

1. Declare dependencies at the top of your `.sa` file with comment directives.
   Order matters: a package must come before any package that uses it.

   ```python
   # @use quantum-strings
   # @use quantum-term
   # @use ./helpers.sa          # your own files, relative to this file

   print(Term.green(Strings.titleCase("hello world")))
   ```

2. Tell the bundler what to build in your project's `package.json`:

   ```json
   {
     "scripts": {
       "start": "(if not exist build mkdir build) && qrun node_modules/quantum-bundle/bin/bundle.sa && qrun build/main.sa"
     },
     "quantum": { "entry": "src/main.sa", "out": "build/main.sa" }
   }
   ```

   Packages resolve from `node_modules/<name>` (where `qpm install` puts them).
   To use them straight from this folder instead, add `"paths": [".."]` (or the
   path to `qpmexamples`) and call `../quantum-bundle/bin/bundle.sa`, as
   [qpm-test-sa/package.json](qpm-test-sa/package.json) does.

3. `qpm run start`. The bundler writes one standalone `build/main.sa` with each
   dependency inlined once, in dependency order.

## Running the tests

From any package folder:

```bat
qpm run test
```

Each suite bundles `test/*.test.sa` with quantum-test and exits non-zero on failure.

## Publishing

`qpm install` currently fetches from registry.npmjs.org. To publish to the QPM
registry, pack a package and upload it (see `qpm/README.md` → *Publishing a package*):

```bash
cd quantum-math
tar -czf quantum-math-1.0.0.tgz package.json index.sa README.md
curl -X POST http://localhost:8000/api/registry/publish \
  -F "name=quantum-math" -F "version=1.0.0" \
  -F "description=Math toolkit for Quantum" -F "keywords=quantum,math" \
  -F "file=@quantum-math-1.0.0.tgz"
```

## Writing your own package: VM rules these packages follow

These were found while building and testing the packages against the current
`qrun`. Breaking them fails silently or corrupts state, so they're worth knowing:

| Rule | Why |
|---|---|
| Declare every local with `let` | A bare `x = 1` inside a function assigns a **global**. It clobbers caller variables and breaks recursion. |
| Never declare `let` inside a `try { }` block | After a catch, locals declared there misalign the stack (later variables read wrong values). Declare before the `try`. |
| Avoid raising through frames whose locals are captured by closures | The catch path does not close upvalues (`VmRun.cpp`, catch handler), so later closures can read stale values. quantum-test records assertion failures instead of raising for this reason. |
| Define functions before top-level code calls them | No hoisting; calling a not-yet-defined function silently returns `nil`. |
| Don't compare strings with `<` / `>` | Always `false`; use `strcmp(a, b)` (or `Strings.compare`). |
| Don't pass a comparator to `arr.sort()` | It is ignored; use `Collections.sortWith` / `sortBy`. |
| Don't rely on dict key order | Iteration order is not insertion order. |
| `==` on functions and class instances is always `false` | Identify listeners and objects by ids. |
| Avoid names `from`, `is`, `int`, `float`, `string`, `bool` as identifiers | They are keywords/type declarations. |
| Avoid identifiers starting with `split` after a dot, and the text `str.split` in strings | The `.sa` front-end rewrites them. |
| Don't name methods `toString`, `to_string` or `to_str` | They are renamed to `__str__` and then return `nil`. |
| No `exit()` and no rest parameters (`...args`) | `exit` isn't a native; an uncaught `raise` exits with code 1. |
| Save files as UTF-8 **without** BOM | The lexer rejects a BOM. |
| ANSI escapes: use `"["` | `"\033"` and `"\x1b"` are not decoded. |
| `os.path.exists` is false for directories; `write_file` does not create folders | Create output folders in your script (`if not exist build mkdir build`). |
