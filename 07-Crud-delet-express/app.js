import express from "express";
import httpError from "./middleware/httpError.js";

const app = express();

const taskList = [
  {
    id: 1,
    task: "playing",
    description: "i am  playing cricket",
  },
  {
    id: 2,
    task: "drive car",
    description: "i am driving car ",
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

  res.status(200).json({ message: "task is successfully", taskList });
});

app.get("/task/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = taskList.find((t) => t.id === id);

  if (!task) {
    return res
      .status(404)
      .json({ success: true, message: "no taskdata found with this id" });
  }

  res.status(200).json({ success: true, message: "task is found", task });
});

app.post("/addTask", (req, res, next) => {
  const { task, description } = req.body;

  if (!task || !description) {
    return next(new httpError("task or description required", 404));
  }

  const newTask = {
    id: new Date().getTime(),
    task,
    description,
  };

  taskList.push(newTask);

  res.status(201).json({
    success: true,
    message: "task is added and successfully",
    newTask,
  });
});

app.patch("/updateTask/:id", (req, res, next) => {
  const id = Number(req.params.id);

  const taskdata = taskList.find((t) => t.id === id);

  if (!taskdata) {
    return next(new httpError("task not found with this id for update", 404));
  }

  const { task, description } = req.body;

  if (task) {
    taskdata.task = task;
  }

  if (description) {
    taskdata.description = description;
  }

  res.status(200).json({
    success: true,
    message: "task data  updated successfully",
    taskdata,
  });
});

app.put("/updateTask/:id", (req, res, next) => {
  const id = Number(req.params.id);

  const taskDataIndex = taskList.findIndex((t) => t.id === id);

  if (taskDataIndex === -1) {
    return next(new httpError("task data with this id not found", 404));
  }

  const { task, description } = req.body;

  taskList[taskDataIndex] = { ...taskList[taskDataIndex], task, description };

  req.status(200).json({
    success: true,
    message: "task data update successfully",
    updateTask: taskList[taskDataIndex],
  });
});

app.delete("/task/:id", (req, res, next) => {
  const id = Number(req.params.id);

  const index = taskList.findIndex((t) => t.id === id);
  if (index === -1) {
    return next(new httpError("task not found with this id", 404));
  }

  taskList.splice(index, 1);

  res
    .status(200)
    .json({ success: true, message: "task data deleted successfully" });
});

app.use((req, res, next) => {
  return next(new httpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "somthing went wrong please try again later",
  });
});

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }

  console.log(`server running port ${port}`);
});
