// task routes

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');


router.post('/', taskController.createNewTask); // asynchronously creates a new task
router.get('/', taskController.getFilteredTasks); // asynchronously fetches all tasks from the database


module.exports = router;