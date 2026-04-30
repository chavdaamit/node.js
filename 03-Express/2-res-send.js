// import express from "express";

// const app = express();

// app.get("/", (req, res) => {
//   res.json("this is home page jbjbbbn");
// });

// app.get("/about", (req, res) => {
//   res.json("this is about page ");
// });

// const port = 5003;

// app.listen(port, (err) => {
//   if (err) {
//     return console.log(err.message);
//   } else {
//     console.log("server running from on port", port);
//   }
// });

import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json("this is home page");
});

app.get("/about", (req, res) => {
  res.json("this is about page");
});

const port = 5005;

app.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  } else {
    console.log(" server running from om port", port);
  }
});
