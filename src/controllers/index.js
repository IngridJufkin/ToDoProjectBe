module.exports = {
  createTask: require("./createTask.controller"),
  getTodoTasks: require("./getTodoTasks.controller"),
  getDoneTasks: require("./getDoneTasks.controller"),
  getAllTasks: require("./getAllTasks.controller"),
  moveTask: require("./moveTask.controller"),
  deleteDoneTask: require("./deleteDoneTask.controller"),
  deleteTodoTask: require("./deleteTodoTask.controller"),
  deleteTask: require("./deleteTask.controller"),
  getTasksByName: require("./getTasksByName.controller"),
  downloadFile: require("./downloadFile.controller"),
};
