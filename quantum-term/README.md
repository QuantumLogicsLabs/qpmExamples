# quantum-term

Terminal output helpers for Quantum CLIs.

```python
# @use quantum-term

print(Term.green("✓ build passed"), Term.gray("(1.2s)"))
print(Term.table([["Ada", 36], ["Alan", 41]], {"headers": ["Name", "Age"], "align": ["left", "right"]}))
print(Term.box("Deployed v1.4.0", {"title": "status"}))
print(Term.progressBar(30, 120))           # [███████░░░░░░░░░░░░░░░░░░░░░░░]  25%
print(Term.tree({"src": ["main.sa", "util.sa"], "README.md": null}, "app"))

Log.info("server started")
Log.warn("disk almost full")
let db = Log.child("db")
db.error("connection lost")                # ERROR [db] connection lost
```

Globals: `Term`, `Logger`, `Log` (a ready-made `Logger` at level `info`).

## Term

**Colors:** `bold` · `dim` · `italic` · `underline` · `inverse` · `red` · `green` · `yellow` · `blue` · `magenta` · `cyan` · `gray` · `style(["bold", "bgRed", "white"], text)` · `rgb(r, g, b, text)`. Set `Term.enabled = false` (or the `NO_COLOR` environment variable) for plain output.

**Measuring:** `stripAnsi(text)` · `width(text)` (ignores colors, counts UTF-8 characters once) · `padEnd` · `padStart` · `padCenter` · `align(text, width, "left|right|center")`

**Layout:**
- `table(rows, {"headers", "align", "border"})`: rows can be arrays or dicts; borders `round` (default), `single`, `double`, `ascii`
- `box(text, {"title", "padding", "border"})`
- `progressBar(current, total, width)`
- `spinner(frameIndex, "dots|line")`
- `divider(width, ch)`
- `bulletList(items, bullet)`
- `numberedList(items)`
- `tree(value, label)`

## Logger

`Logger(name, level)` with levels `debug < info < success < warn < error < silent`.

`debug` · `info` · `success` · `warn` · `error` (each returns whether it printed) · `setLevel(level)` · `child(name)` (prefixes `parent:child`) · `timestamps = true` adds `HH:MM:SS` (UTC) · `sink = fn(line) { ... }` redirects output (e.g. into a file or a test array).

## Test

```bat
qpm run test
```
