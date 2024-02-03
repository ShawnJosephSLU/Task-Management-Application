// task routes

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const checkAuthUser = require("../middleware/check-auth-user");

router.post("/", checkAuthUser, taskController.createNewTask); // asynchronously creates a new task
router.get("/", checkAuthUser, taskController.getFilteredTasks); // asynchronously fetches all tasks from the database
router.patch("/:taskId", checkAuthUser, taskController.updateTask); // update task
router.get("/:taskId", checkAuthUser, taskController.getTaskById); // asynchronously fetches single tasks from the database
router.delete("/:taskId", checkAuthUser, taskController.deleteTask); // asynchronously deletes a single task  from the database
module.exports = router;
