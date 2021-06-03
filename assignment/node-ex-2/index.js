const http = require("http");
const servePage = require("./servePage");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    servePage(res, "index.html");
  } else {
    res.writeHead(404);
    res.write("Page not Found");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Listining On PORT 3000");
});
