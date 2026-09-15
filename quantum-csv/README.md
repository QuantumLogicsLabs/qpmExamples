# quantum-csv

Read and write CSV in Quantum. Handles quoted fields, `""` escapes, delimiters and newlines inside quotes, CRLF line endings and a UTF-8 BOM.

```python
# @use quantum-csv

let people = CSV.readFile("people.csv")       # [{"name": "Ada", "age": 36}, ...]
let adults = people.filter(fn(p) { return p["age"] >= 18 })
CSV.writeFile("adults.csv", adults, {"columns": ["name", "age"]})

let rows = CSV.parse("x;y\n1;2", {"header": false, "delimiter": ";"})   # [["x", "y"], [1, 2]]
```

Global: `CSV`.

## API

`parse(text, options)` · `stringify(rows, options)` · `readFile(path, options)` · `writeFile(path, rows, options)` · `parseRows(text, options)` (always arrays)

**Parse options**

| Option | Default | |
|---|---|---|
| `delimiter` | `","` | any single character, e.g. `";"` or `"\t"` |
| `header` | `true` | first row becomes the keys of each record; `false` returns arrays |
| `numbers` | `true` | unquoted numeric cells become numbers (codes with leading zeros like `007` stay text) |
| `trim` | `true` | trims unquoted cells (quoted cells are kept exactly) |
| `skipEmpty` | `true` | ignores blank lines |

Missing cells become `null`; an unterminated quote raises.

**Stringify options:** `delimiter` · `columns` (column order for records; default is every key in first-seen order) · `header` (default `true`). Fields are quoted only when they contain the delimiter, quotes, newlines or surrounding spaces.

**Record helpers:** `column(records, name)` · `where(records, name, value)` · `renameColumns(records, {"Old": "new"})`

## Test

```bat
qpm run test
```
