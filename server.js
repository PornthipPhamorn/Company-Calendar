// Minimal static server for Railway: serves ./public on $PORT.
const http = require("http"), fs = require("fs"), path = require("path");
const root = path.join(__dirname, "public");
const types = { ".html": "text/html; charset=utf-8", ".pdf": "application/pdf", ".png": "image/png", ".jpg": "image/jpeg", ".ics": "text/calendar; charset=utf-8" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/" || p === "") p = "/index.html";
  const file = path.normalize(path.join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end("Forbidden"); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(data);
  });
}).listen(process.env.PORT || 3000, () => console.log("AviusULD calendar on port " + (process.env.PORT || 3000)));
