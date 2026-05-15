import express from "express";
import httpError from "./middleware/httpError.js";

const app = express();

app.use("/", (req, res) => {
  res.send("hello from server");
});

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }

  console.log(`server runninng on from port ${port}`);
});
