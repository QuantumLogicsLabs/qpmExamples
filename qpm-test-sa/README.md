# qpm-test-sa

Demo project that consumes the `.sa` packages from this folder. It reads `data/sales.csv`, validates each row, and prints a sales report with a summary box, a per-region table and a top-reps chart.

```bat
qpm run start
```

Uses quantum-csv, quantum-validate, quantum-collections, quantum-math, quantum-strings, quantum-datetime, quantum-term, quantum-loops and quantum-events. See the `# @use` lines in [src/main.sa](src/main.sa) and the relative include of [src/report.sa](src/report.sa).

`"paths": [".."]` in `package.json` lets the bundler find the packages as sibling folders. In a real project you would `qpm install` them into `node_modules` and drop `paths`.
