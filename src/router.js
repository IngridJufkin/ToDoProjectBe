const express = require("express");
const router = express.Router();

const {
  getTodoTasks,
  getDoneTasks,
  getAllTasks,
  createTask,
  moveTask,
  deleteDoneTask,
  deleteTodoTask,
  deleteTask,
  getTasksByName,
  downloadFile
} = require("./controllers");

router.get("/todo-tasks", getTodoTasks);
router.get("/done-tasks", getDoneTasks);
router.get("/all-tasks", getAllTasks);
// id is mongo object _id and toTask is todo or done
router.get("/moveTask/:id/:toTask", moveTask);
router.post("/createTask", createTask);
router.post("/downloadFile", downloadFile);

router.delete("/:id/:toTask", deleteDoneTask);
router.delete("/:id/:toTask", deleteTodoTask);
router.delete("/deleteTask", deleteTask);
router.get("/getTasksByName/:userName", getTasksByName);

module.exports = router;
