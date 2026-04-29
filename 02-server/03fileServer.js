import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  fs.readFile("./index.html", (err, data) => {
    if (err) {
      res.writeHead("file not found");
      res.end();
    } else {
      // res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    }
  });
});

const port = 5003;

server.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server running on port", port);
});
