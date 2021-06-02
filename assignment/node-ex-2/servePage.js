const fs = require("fs");
const path = require("path");

function servePage(res, filename) {
  fs.readFile(path.join(__dirname, "views", filename), (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("File not found");
    } else {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.write(data);
    }
    res.end();
  });
}

module.exports = servePage;
