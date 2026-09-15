# quantum-bundle

Makes qpm packages usable in Quantum projects today. Quantum doesn't load modules at runtime yet, so this tool follows `# @use` directives and inlines every dependency into one standalone `.sa` file.

```python
# src/main.sa
# @use quantum-strings              -> node_modules/quantum-strings/<main from package.json>
# @use quantum-strings/extra.sa     -> a specific file inside a package
# @use ./helpers.sa                 -> relative to this file

print(Strings.titleCase("hello"))
```

```json
{
  "scripts": {
    "start": "(if not exist build mkdir build) && qrun node_modules/quantum-bundle/bin/bundle.sa && qrun build/main.sa"
  },
  "quantum": {
    "entry": "src/main.sa",
    "out": "build/main.sa",
    "paths": []
  }
}
```

```bat
qpm run start
```

## Configuration (`"quantum"` in package.json)

`qrun` doesn't pass arguments to scripts, so the CLI reads its settings from the current directory's `package.json`.

| Key | |
|---|---|
| `entry`, `out` | a single bundle (default `out`: `build/<entry file name>`) |
| `bundles` | several bundles: `[{"entry": "...", "out": "..."}]` |
| `paths` | extra folders to search for packages after `node_modules`, e.g. `[".."]` for sibling folders |

## How it works

- Dependencies are emitted depth-first, before the file that uses them. That matters because Quantum has no function hoisting.
- Each file is included once, even when several modules use it.
- Circular `@use` chains are skipped with a warning instead of looping.
- A UTF-8 BOM is removed (the lexer rejects it).
- Errors list every location that was searched and exit with code 1.
- The output folder must exist (`write_file` doesn't create folders), which is why the scripts run `if not exist build mkdir build` first.

Directives are ordinary comments, so un-bundled files still parse.

## Library

`lib/bundler.sa` exposes `Bundler` for build scripts: `build(entry, out, options)` · `bundleSource(entry, options)` → `{"text", "modules", "warnings"}` · `resolve(spec, fromDir, options)` · `parseUses(source)` · `normalize(path)` · `join(a, b)` · `dirname(path)`.

`bin/bundle.sa` is `src/cli.sa` bundled with the library. Rebuild it with `qpm run build`, which uses the bundler to bundle itself.
