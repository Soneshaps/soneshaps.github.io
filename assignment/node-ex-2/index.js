const http = require("http");
const servePage = require("./servePage");

const server = http.createServer((req, res) => {
  servePage(res, "page.html");
});

server.listen(3000, () => {
  console.log("Listining On PORT 3000");
});
