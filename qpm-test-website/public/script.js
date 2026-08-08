// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// Typewriter demo of the qpm workflow this very page was launched with.
const script = [
  { type: "cmd", text: "qpm install" },
  { type: "out", text: "[qpm] installing dependencies for qpm-test-website" },
  { type: "out", text: "  + express@4.19.2" },
  { type: "out", text: "  + body-parser@1.20.2" },
  { type: "out", text: "  + send@0.18.0" },
  { type: "out", text: "  ... 27 more" },
  { type: "out", text: "" },
  { type: "out", text: "[qpm] 30 package(s) installed, 0 already up to date" },
  { type: "out", text: "" },
  { type: "cmd", text: "qpm run dev" },
  { type: "out", text: "> dev" },
  { type: "out", text: "> node server.js" },
  { type: "out", text: "" },
  { type: "out", text: "  qpm-test-website dev server running" },
  { type: "out", text: "" },
  { type: "out", text: "  Local:   http://localhost:3000/" },
];

const terminalBody = document.getElementById("terminalBody");

function typeLine(line, el, done) {
  const prefix = line.type === "cmd" ? "$ " : "";
  const span = document.createElement("div");
  if (line.type === "cmd") span.style.color = "#e7e9ee";
  el.appendChild(span);

  const full = prefix + line.text;
  let i = 0;
  const speed = line.type === "cmd" ? 34 : 4;

  (function step() {
    span.textContent = full.slice(0, i);
    i++;
    if (i <= full.length) {
      setTimeout(step, speed);
    } else {
      done();
    }
  })();
}

function runScript(lines, el) {
  let idx = 0;
  const cursor = document.createElement("span");
  cursor.className = "terminal-cursor";

  function next() {
    if (idx >= lines.length) {
      el.appendChild(cursor);
      return;
    }
    typeLine(lines[idx], el, () => {
      idx++;
      setTimeout(next, lines[idx - 1].type === "cmd" ? 220 : 40);
    });
  }
  next();
}

if (terminalBody) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runScript(script, terminalBody);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(terminalBody);
}
