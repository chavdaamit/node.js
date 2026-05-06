// import express from "express";
// import httpError from "./middleware/httpError.js";
// const app = express();

// const taskList = [
//   {
//     id: 1,
//     task: "playing",
//     description: "Cricket playing",
//   },
//   {
//     id: 2,
//     task: "traveling",
//     description: "I am goin to Dwarka",
//   },
// ];

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("hello from  server");
// });

// app.get("/taskList", (req, res, next) => {
//   if (taskList.length === 0) {
//     return res.status(200).json("task is not found");
//   }
//   res
//     .status(200)
//     .json({ message: "task list data  retrieved successfully", taskList });
// });

// const port = 5000;

// app.listen(port, (err) => {
//   if (err) {
//     return console.log(err.message);
//   }

//   console.log(`server running from on port ${port}`);
// });

import express from "express";
import httpError from "./middleware/httpError.js";

const app = express();

const taskList = [
  {
    id: 1,
    task: "playing",
    description: "i am playing game",
  },
  {
    id: 2,
    task: "cricket",
    description: "i am playing cricket",
  },
];

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use(express.json());

app.get("/taskList", (req, res) => {
  if (taskList.length === 0) {
    return res.status(200).json("task is not found");
  }

  res.status(200).json({ message: "task is succesfully",taskList });
});

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }

  console.log(` server running  from on port ${port}`);
});
