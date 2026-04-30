// import express from "express";

// const app = express();

// app.get("/", (req, res) => {
//   res.send("hello form server");
// });

// const port = 5000;

// app.listen(port, () => {
//   console.log("server running from port", port);
// });

import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("hello from server");
});

const port = 5000;

app.listen(port, () => {
  console.log("server running from on port", port);
});
