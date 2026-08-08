const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`\n  qpm-test-website dev server running\n\n  Local:   http://localhost:${PORT}/\n`);
});
