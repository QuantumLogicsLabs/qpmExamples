# generatefolderstructure

Writes a project's folder structure to a text file as a tree, or to a JSON file with `--json`.

```bat
qpm install generatefolderstructure
generatefolderstructure            &:: -> folder-structure.txt
generatefolderstructure --json     &:: -> folder-structure.json
generatefolderstructure docs       &:: map ./docs instead of the current folder
```

From a checkout, run the script directly: `qrun bin/generatefolderstructure.sa [folder] [--json]`.

## Text output

```
compiler/
├── .claude/
│   ├── settings.json
│   └── settings.local.json
├── .git/  [skipped]
├── build/  [skipped]
├── docs/
│   ├── code-explanation/
│   │   ├── .git/  [skipped]
│   │   ├── include/
│   │   │   ├── AST/
│   │   │   │   ├── AST.h
│   │   │   │   └── README.md
│   │   │   ├── Error/
```

- Folders end in `/` and come before files. Each group is sorted case-insensitively.
- `.git`, `node_modules` and `build` are listed as `[skipped]` and are not opened.
- A folder that can't be read is shown as `[unreadable]`.

## JSON output

```json
{
  "name": "compiler",
  "type": "directory",
  "children": [
    {
      "name": ".git",
      "type": "directory",
      "skipped": true
    },
    {
      "name": "README.md",
      "type": "file"
    }
  ]
}
```

Every node has `name` and `type` (`"directory"` or `"file"`). Directories also have `children`, `"skipped": true` if skipped, or an `error` string if they couldn't be read.

## Notes

- Output is always written to the **current** folder, even when you map a different folder.
- `folder-structure.txt` and `folder-structure.json` never list themselves, so running the tool again gives the same result.
- Needs a Quantum build with `sys.argv`, `os.listdir`, `os.path.isdir` and `os.path.abspath`.

## Library

`index.sa` exposes `FolderStructure` for your own scripts:

```python
# @use generatefolderstructure

let tree = FolderStructure.walk(".", {"skip": [".git", "dist"], "omit": ["secrets.txt"]})
print(FolderStructure.toText(tree))
```

| Member | |
|---|---|
| `walk(root, options)` | builds the tree. `skip`: folder names to list but not open (default `DEFAULT_SKIP`). `omit`: paths relative to `root` to leave out. |
| `toText(tree)` / `toJson(tree)` | render the tree as text or JSON |
| `count(tree)` | `{"directories": n, "files": n}` below the root |
| `DEFAULT_SKIP` | `[".git", "node_modules", "build"]` |

## Tests

```bat
qpm run test
```
